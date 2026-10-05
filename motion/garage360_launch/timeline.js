// Utilidades de línea de tiempo: todo se expresa en FRAMES (30 fps, 450 en total).
const FPS = 30, TOTAL_FRAMES = 450, TOTAL_MS = (TOTAL_FRAMES / FPS) * 1000;

const EASE = {
  linear: "linear",
  outCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  inOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  inCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
};

/**
 * track(el, [[frame, {prop: valor}, easingHaciaSiguiente?], ...])
 * Crea UNA animación (WAAPI) sobre toda la línea de tiempo con fill both, de modo que
 * el renderizador pueda posicionarla en cualquier fotograma. Mantener una sola animación
 * por propiedad y por elemento evita conflictos y dobles fundidos.
 */
function track(el, keys) {
  const frames = keys.map(([f, props, ease]) => ({
    offset: f / TOTAL_FRAMES,
    easing: ease || EASE.linear,
    ...props,
  }));
  if (frames[0].offset > 0) frames.unshift({ ...frames[0], offset: 0 });
  if (frames[frames.length - 1].offset < 1) frames.push({ ...frames[frames.length - 1], offset: 1, easing: "linear" });
  return el.animate(frames, { duration: TOTAL_MS, fill: "both", easing: "linear" });
}

// Visibilidad discreta de una escena: visible solo entre [from, to) frames.
function showBetween(el, from, to) {
  // La interpolación de `visibility` es visible durante todo el tramo si un extremo lo es:
  // se usan fotogramas de guarda (±0.01) para que el cambio sea realmente discreto.
  const e = 0.01, k = [[0, { visibility: "hidden" }]];
  if (from > 0) k.push([from - e, { visibility: "hidden" }]);
  k.push([from, { visibility: "visible" }], [to - e, { visibility: "visible" }], [to, { visibility: "hidden" }]);
  return track(el, k);
}

const $ = (sel) => document.querySelector(sel);
