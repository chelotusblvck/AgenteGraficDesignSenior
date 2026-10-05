// Apertura (logo Garage360, frames absolutos 0-75), título (75-150) y cierre (logo MotoOps, últimos 75 frames).
// Opacidad solo sobre el logo; la sección contenedora solo cambia su visibilidad (sin doble fundido).
const IntroOutro = {
  init() {
    const END = OFFSET + CONTENT + TAIL;
    const logoTrack = (el, f) => trackAbs(el, [
      [f, { opacity: 0, transform: "scale(0.9)" }, EASE.outCubic],
      [f + 15, { opacity: 1, transform: "scale(1)" }],           // entrada: 15 frames, ease-out-cubic
      [f + 65, { opacity: 1, transform: "scale(1)" }, EASE.linear],
      [f + 75, { opacity: 0, transform: "scale(1)" }],           // salida: fundido rápido de 10 frames
    ]);
    trackAbs($("#intro"), [[0, { visibility: "visible" }], [74.99, { visibility: "visible" }], [75, { visibility: "hidden" }]]);
    logoTrack($("#intro-logo"), 0);

    // Título introductorio: mismo fade in (15f, ease-out-cubic) y fade out (10f); la opacidad vive en cada pieza.
    trackAbs($("#title-card"), [[0, { visibility: "hidden" }], [INTRO - 0.01, { visibility: "hidden" }], [INTRO, { visibility: "visible" }], [OFFSET - 0.01, { visibility: "visible" }], [OFFSET, { visibility: "hidden" }]]);
    const inOut = (f) => [[f, { opacity: 0 }, EASE.outCubic], [f + 15, { opacity: 1 }], [f + 65, { opacity: 1 }, EASE.linear], [f + 75, { opacity: 0 }]];
    trackAbs($("#tc-bar"), inOut(INTRO));
    trackAbs($("#tc-title"), inOut(INTRO));
    trackAbs($("#tc-title"), [[INTRO, { transform: "translateY(12px)" }, EASE.outCubic], [INTRO + 15, { transform: "translateY(0)" }]]);
    trackAbs($("#outro"), [[0, { visibility: "hidden" }], [END - TAIL - 0.01, { visibility: "hidden" }], [END - TAIL, { visibility: "visible" }]]);
    logoTrack($("#outro-logo"), END - TAIL);
  },
};
