// ESCENA 1 · Apertura y recepción · frames 0-225
const Scene1Recepcion = {
  init() {
    const [A, Z] = SCENES.s1;
    const s = $("#s1");
    s.innerHTML = `
      <i class="bar"></i><h2 class="title">RECEPCIÓN Y CHECK-IN</h2>
      <div class="plate" style="height:452px">
        <i class="plate-bg"></i>
        <div class="ot-id"><span class="lbl">ORDEN DE TRABAJO</span><span class="ph">#OT-····</span><span class="num">#OT-0182</span></div>
        <b class="badge b-accent">EN RECEPCIÓN</b>
        <i class="rule" style="top:72px"></i>
        ${[["Cliente", "Camila Rojas"], ["Teléfono", "+56 9 •••• 4821"], ["Vehículo", "Triumph Street Triple 765 R"], ["Ingreso", "08:30 AM · mesón"], ["Motivo", "Mantención y frenos"]]
          .map(([l, v], i) => `<div class="p-row" style="top:${88 + i * 56}px"><div class="lbl">${l}</div><div class="val">${v}</div></div>`).join("")}
        <i class="btn-ring"></i>
        <div class="btn-photo"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#111315" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L8 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3.5"/></svg><span>Agregar fotos de la moto</span></div>
        <b class="btn-chip mono">+3 FOTOS</b>
      </div>`;
    showBetween(s, A, Z);

    appear(s.querySelector(".bar"), 4, Z);
    appear(s.querySelector(".title"), 6, Z);
    life(s.querySelector(".plate-bg"), 8, Z);
    life(s.querySelector(".rule"), 18, Z);
    s.querySelectorAll(".p-row").forEach((r, i) => appear(r, 24 + i * 12, Z));

    // Generación progresiva de la OT: placeholder -> "#OT-0182" escrito carácter a carácter (8 pasos).
    life(s.querySelector(".ot-id .lbl"), 14, Z);
    life(s.querySelector(".ph"), 16, 94, 12, 8);
    const num = s.querySelector(".num");
    track(num, [[0, { width: "0ch" }, "steps(8, end)"], [92, { width: "0ch" }, "steps(8, end)"], [116, { width: "8ch" }]]);
    track(num, [[0, { opacity: 0 }], [92, { opacity: 0 }], [93, { opacity: 1 }], [Z - 10, { opacity: 1 }, EASE.inCubic], [Z, { opacity: 0 }]]);
    // Badge de estado: aparece al terminar de generar la OT.
    appear(s.querySelector(".badge"), 120, Z, 6);

    // Botón destacado "Agregar fotos de la moto": entra, emite 2 pulsos de aro, se presiona (f196) y suma el chip "+3 FOTOS".
    const btn = s.querySelector(".btn-photo"), ring = s.querySelector(".btn-ring"), chip = s.querySelector(".btn-chip");
    appear(btn, 132, Z, 12);
    track(btn, [[0, { transform: "scale(1)" }], [190, { transform: "scale(1)" }, EASE.inOutCubic], [196, { transform: "scale(0.96)" }, EASE.inOutCubic], [202, { transform: "scale(1)" }]]);
    const pulse = (f) => [[f, { opacity: 0.9, transform: "scale(1)" }, EASE.outCubic], [f + 22, { opacity: 0, transform: "scale(1.08, 1.35)" }]];
    track(ring, [[0, { opacity: 0, transform: "scale(1)" }], ...pulse(150), ...pulse(172), [194, { opacity: 0 }]]);
    appear(chip, 200, Z, 6);
  },
};
