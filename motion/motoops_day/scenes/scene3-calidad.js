// ESCENA 3 · Taller y control de calidad · frames 450-675
const Scene3Calidad = {
  CHECKS: ["Diagnóstico e inspección", "Mantenimiento y repuestos", "Prueba de ruta y QA"],

  init() {
    const [A, Z] = SCENES.s3;
    const s = $("#s3");
    const rows = this.CHECKS.map((t, i) => {
      const y = 116 + i * 80;
      return `
        <i class="cb" style="top:${y + 4}px"></i>
        <svg class="ck" style="top:${y + 4}px" viewBox="0 0 32 32" width="32" height="32"><path d="M8 17l5.5 5.5L24 11" pathLength="1" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="p-row ck-name" style="top:${y}px;left:64px"><div class="val" style="margin:0">${t}</div><div class="lbl" style="margin-top:2px">PUNTO ${i + 1} DE 3</div></div>
        <b class="badge b-ok ck-ok" style="top:${y + 8}px">OK</b>`;
    }).join("");
    s.innerHTML = `
      <i class="bar"></i><h2 class="title">CONTROL DE CALIDAD</h2>
      <div class="plate" style="height:420px">
        <i class="plate-bg"></i>
        <span class="ot-num mono">#OT-0182</span>
        <b class="badge b-ok" id="b-apro3">APROBADO POR CLIENTE</b>
        <b class="badge b-ok" id="b-qa">QA APROBADO</b>
        <i class="rule" style="top:72px"></i>
        <div class="p-row sub-lbl" style="top:84px"><div class="lbl">Lista de verificación</div></div>
        ${rows}
        <i class="rule cnt-rule" style="top:364px"></i>
        <div class="cnt" style="top:376px"><span class="lbl">Verificaciones</span><span class="cnt-n mono"><span class="num-n"></span>/3</span></div>
      </div>`;
    showBetween(s, A, Z);

    appear(s.querySelector(".bar"), A + 4, Z);
    appear(s.querySelector(".title"), A + 6, Z);
    life(s.querySelector(".plate-bg"), A + 8, Z);
    life(s.querySelector(".ot-num"), A + 12, Z);
    life(s.querySelectorAll(".rule")[0], A + 14, Z);
    appear(s.querySelector(".sub-lbl"), A + 16, Z, 8);

    const QA = A + 178;
    life(s.querySelector("#b-apro3"), A + 12, QA + 8, 12, 8);
    life(s.querySelector("#b-qa"), QA, Z);

    const boxes = s.querySelectorAll(".cb"), cks = s.querySelectorAll(".ck"), names = s.querySelectorAll(".ck-name"), oks = s.querySelectorAll(".ck-ok");
    this.CHECKS.forEach((_, i) => {
      const inF = A + 22 + i * 12;   // aparece la fila (casilla vacía)
      const t = A + 56 + i * 50;     // se marca el punto
      appear(names[i], inF, Z);
      life(boxes[i], inF, Z);
      // Marca de verificación dibujada (stroke-dashoffset) sobre la casilla, que se rellena de verde.
      track(cks[i], [[0, { opacity: 0, strokeDashoffset: 1 }], [t, { opacity: 0, strokeDashoffset: 1 }], [t + 1, { opacity: 1, strokeDashoffset: 1 }, EASE.outCubic], [t + 16, { opacity: 1, strokeDashoffset: 0 }], [Z - 10, { opacity: 1 }, EASE.inCubic], [Z, { opacity: 0 }]]);
      track(boxes[i], [[0, { backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0.12)" }], [t, { backgroundColor: "rgba(21,128,61,0)", borderColor: "rgba(255,255,255,0.3)" }, EASE.outCubic], [t + 10, { backgroundColor: "rgba(21,128,61,1)", borderColor: "rgba(21,128,61,1)" }]]);
      appear(oks[i], t + 12, Z, 6);
    });
    // Contador 0/3 -> 3/3 en pasos.
    const cn = s.querySelector(".cnt-n");
    life(cn, A + 30, Z);
    track(cn, [[0, { "--n": 0 }, EASE.step], [A + 62, { "--n": 1 }, EASE.step], [A + 112, { "--n": 2 }, EASE.step], [A + 162, { "--n": 3 }]]);
    appear(s.querySelector(".cnt-rule"), A + 28, Z, 0);
    appear(s.querySelector(".cnt .lbl"), A + 30, Z, 6);
  },
};
