// ESCENA 3 · Submarca y CTA · frames 225-330
const Scene3Cta = {
  init() {
    showBetween($("#s3"), 225, 330);
    // Velo de #111315 (hermano, no contenedor): fade desde la escena 2 hacia el negro de marca.
    track($("#veil"), [[0, { opacity: 0 }], [215, { opacity: 0 }, EASE.inOutCubic], [225, { opacity: 1 }]]);
    // MotoOps primero (regla de orden del manual), AutoOps escalonado justo después.
    [["#s3-logo", 225], ["#s3-logo2", 233]].forEach(([sel, f]) =>
      track($(sel), [
        [f, { opacity: 0, transform: "translateY(8px)" }, EASE.outCubic],
        [f + 15, { opacity: 1, transform: "translateY(0)" }],
        [270, { opacity: 1 }, EASE.inCubic],
        [280, { opacity: 0 }],
      ])
    );
    const lines = document.querySelectorAll("#s3-cta span");
    track($("#s3-cta"), [[0, { opacity: 0 }], [280, { opacity: 0 }, EASE.outCubic], [295, { opacity: 1 }], [320, { opacity: 1 }, EASE.inCubic], [330, { opacity: 0 }]]);
    // Entrada escalonada de líneas: solo transform (la opacidad vive en el h1).
    lines.forEach((el, i) =>
      track(el, [[0, { transform: "translateY(16px)" }], [280 + i * 4, { transform: "translateY(16px)" }, EASE.outCubic], [298 + i * 4, { transform: "translateY(0)" }]])
    );
  },
};
