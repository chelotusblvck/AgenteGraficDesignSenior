// HUD persistente: reloj, paso y barra de progreso.
// Regla anti doble-fundido: la opacidad se anima en UN solo nivel por rama (el contenedor #clock es estático).
// El reloj usa @property enteros + contadores CSS, así se actualiza solo al posicionar la animación en cada frame.
const Hud = {
  init() {
    $("#hud").innerHTML = `
      <div id="clock-label" class="mono">HORA DE TALLER</div>
      <div id="clock"><span id="clock-digits" class="mono"></span><span id="ampm-am" class="mono ampm">AM</span><span id="ampm-pm" class="mono ampm">PM</span></div>
      <div id="steps" class="mono">${[1, 2, 3, 4, 5].map((n) => `<span class="step">PASO ${n}/5</span>`).join("")}</div>
      <div id="hud-rule"></div>
      <div id="progress">${[1, 2, 3, 4, 5].map(() => `<i class="seg"><b></b></i>`).join("")}</div>`;

    // Hora (minutos desde medianoche): 08:30 -> 11:00 -> 15:30 -> 18:00, avance suave al inicio de cada escena.
    track($("#clock-digits"), [
      [0, { "--t": 510 }], [225, { "--t": 510 }, EASE.inOutCubic], [270, { "--t": 660 }],
      [450, { "--t": 660 }, EASE.inOutCubic], [495, { "--t": 810 }],
      [675, { "--t": 810 }, EASE.inOutCubic], [720, { "--t": 930 }],
      [900, { "--t": 930 }, EASE.inOutCubic], [945, { "--t": 1080 }],
    ]);

    // Retirada del HUD antes del CTA: cada pieza con su propia opacidad.
    const fadeOut = (sel, inF = 0) => track($(sel), [[0, { opacity: 0 }, EASE.outCubic], [inF, { opacity: 0 }, EASE.outCubic], [inF + 12, { opacity: 1 }], [CTA_FRAME - 10, { opacity: 1 }, EASE.inCubic], [CTA_FRAME, { opacity: 0 }]]);
    ["#clock-label", "#clock-digits", "#steps", "#hud-rule", "#progress"].forEach((s) => fadeOut(s));

    // AM hasta pasar el mediodía (~f470); PM después. Visibilidad discreta por pieza, ocultas al entrar el CTA.
    showBetween($("#ampm-am"), 0, 470);
    showBetween($("#ampm-pm"), 470, CTA_FRAME);

    // Etiqueta de paso: visible solo durante su escena.
    document.querySelectorAll(".step").forEach((s, i) => {
      const [a, b] = SCENES["s" + (i + 1)];
      showBetween(s, a, Math.min(b, CTA_FRAME));
    });

    // Progreso por escena (solo transform en el relleno).
    document.querySelectorAll("#progress .seg b").forEach((b, i) => {
      const [a, z] = SCENES["s" + (i + 1)];
      track(b, [[0, { transform: "scaleX(0)" }], [a, { transform: "scaleX(0)" }], [Math.min(z, CTA_FRAME), { transform: "scaleX(1)" }]]);
    });
  },
};
