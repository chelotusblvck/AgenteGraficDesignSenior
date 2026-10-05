// Línea de tiempo en FRAMES a 30 fps: logo de apertura (75) + contenido (900) + logo de cierre (75) = 1050 (35 s).
// Todo el contenido se escribe en frames LOCALES 0-900; track() lo desplaza OFFSET frames automáticamente.
// Apertura y cierre usan trackAbs() con frames absolutos.
const FPS = 30, OFFSET = 75, CONTENT = 900, TAIL = 75;
const TOTAL_FRAMES = OFFSET + CONTENT + TAIL, TOTAL_MS = (TOTAL_FRAMES / FPS) * 1000;
const SCENES = { s1: [0, 225], s2: [225, 450], s3: [450, 675], s4: [675, 900] };
const CTA_FRAME = 780;

const EASE = {
  linear: "linear",
  outCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  inOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  inCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  step: "steps(1, end)",
};

/** Una animación WAAPI (fill both) por elemento y propiedad, sobre los 900 frames.
 *  keys: [[frame, {prop: valor}, easingHaciaLaSiguiente?], ...] */
function track(el, keys, abs = false) {
  const sorted = [];
  keys.forEach(([f0, props, ease]) => {
    const f = abs ? f0 : f0 + OFFSET;
    if (sorted.length && sorted[sorted.length - 1].f === f) sorted.pop();
    sorted.push({ f, props, ease });
  });
  if (sorted[0].f > 0) sorted.unshift({ ...sorted[0], f: 0 });
  if (sorted[sorted.length - 1].f < TOTAL_FRAMES) sorted.push({ ...sorted[sorted.length - 1], f: TOTAL_FRAMES, ease: "linear" });
  const frames = sorted.map(({ f, props, ease }) => ({ offset: f / TOTAL_FRAMES, easing: ease || EASE.linear, ...props }));
  return el.animate(frames, { duration: TOTAL_MS, fill: "both", easing: "linear" });
}

const trackAbs = (el, keys) => track(el, keys, true);

/** Visibilidad discreta: el elemento sale del render fuera de [from, to).
 *  (visibility interpola como "visible" en todo tramo con un extremo visible: por eso los fotogramas de guarda.) */
function showBetween(el, from, to) {
  // Frames absolutos: oculto desde el frame 0 (incluida la apertura) hasta from + OFFSET.
  const e = 0.01, a = from + OFFSET, z = to + OFFSET;
  return track(el, [[0, { visibility: "hidden" }], [a - e, { visibility: "hidden" }], [a, { visibility: "visible" }], [z - e, { visibility: "visible" }], [z, { visibility: "hidden" }]], true);
}

/** Ciclo de vida de opacidad de UN elemento: entra en inF, sale en outF (null = permanece). Una sola capa de opacidad por rama. */
function life(el, inF, outF = null, inD = 12, outD = 10) {
  const k = [[0, { opacity: 0 }, EASE.outCubic], [inF, { opacity: 0 }, EASE.outCubic], [inF + inD, { opacity: 1 }]];
  if (outF !== null) k.push([outF - outD, { opacity: 1 }, EASE.inCubic], [outF, { opacity: 0 }]);
  return track(el, k);
}

/** Entrada con desplazamiento (solo transform; la opacidad la maneja life()). */
function rise(el, inF, dy = 14, d = 16) {
  return track(el, [[0, { transform: `translateY(${dy}px)` }, EASE.outCubic], [inF, { transform: `translateY(${dy}px)` }, EASE.outCubic], [inF + d, { transform: "translateY(0)" }]]);
}

/** Entrada completa (opacidad + desplazamiento) con salida opcional. */
function appear(el, inF, outF = null, dy = 14) {
  life(el, inF, outF);
  rise(el, inF, dy);
}

const $ = (sel) => document.querySelector(sel);
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
