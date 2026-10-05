// ESCENA 1 · Intro de marca · frames 0-75
const Scene1Intro = {
  init() {
    showBetween($("#s1"), 0, 75);
    // Opacidad solo sobre el logo (la escena contenedora no se anima: sin doble fundido).
    track($("#s1-logo"), [
      [0, { opacity: 0, transform: "scale(0.9)" }, EASE.outCubic],
      [15, { opacity: 1, transform: "scale(1)" }],
      [65, { opacity: 1, transform: "scale(1)" }, EASE.linear],
      [75, { opacity: 0, transform: "scale(1)" }],
    ]);
  },
};
