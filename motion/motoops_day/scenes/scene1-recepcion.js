// ESCENA 1 · Apertura y recepción · frames 0-225
const Scene1Recepcion = {
  init() {
    const [A, Z] = SCENES.s1;
    const s = $("#s1");
    s.innerHTML = `
      <i class="bar"></i><h2 class="title">RECEPCIÓN Y CHECK-IN</h2>
      <div class="plate" style="height:376px">
        <i class="plate-bg"></i>
        <div class="ot-id"><span class="lbl">ORDEN DE TRABAJO</span><span class="ph">#OT-····</span><span class="num">#OT-0182</span></div>
        <b class="badge b-accent">EN RECEPCIÓN</b>
        <i class="rule" style="top:72px"></i>
        ${[["Cliente", "Camila Rojas"], ["Teléfono", "+56 9 •••• 4821"], ["Vehículo", "Triumph Street Triple 765 R"], ["Ingreso", "08:30 AM · mesón"], ["Motivo", "Mantención y frenos"]]
          .map(([l, v], i) => `<div class="p-row" style="top:${88 + i * 56}px"><div class="lbl">${l}</div><div class="val">${v}</div></div>`).join("")}
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
  },
};
