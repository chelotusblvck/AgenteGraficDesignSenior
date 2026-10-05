// ESCENA 2 · Diagnóstico e inventario · frames 225-450
const Scene2Diagnostico = {
  ITEMS: [
    // nombre, stock inicial, stock final, capacidad de la barra
    ["Aceite 5W30", 12, 11, 15],
    ["Filtro de aceite", 8, 7, 10],
    ["Pastillas de freno", 6, 5, 10],
  ],

  init() {
    const [A, Z] = SCENES.s2;
    const s = $("#s2");
    const rows = this.ITEMS.map(([n], i) => {
      const y = 112 + i * 76;
      return `
        <div class="p-row it-name" style="top:${y}px"><div class="val" style="font-size:16px;margin:0">${n}</div><div class="lbl" style="margin-top:2px">ASIGNADO A #OT-0182</div></div>
        <div class="it-stock mono" style="top:${y - 2}px"><span class="num-n"></span><em class="lbl">&nbsp;EN STOCK</em></div>
        <b class="it-chip mono" style="top:${y + 2}px">−1</b>
        <div class="mb" style="top:${y + 52}px"><i></i></div>`;
    }).join("");
    s.innerHTML = `
      <i class="bar"></i><h2 class="title">DIAGNÓSTICO E INVENTARIO</h2>
      <div class="plate" style="height:392px">
        <i class="plate-bg"></i>
        <span class="ot-num mono">#OT-0182</span>
        <b class="badge b-accent" id="b-recep">EN RECEPCIÓN</b>
        <b class="badge b-ok" id="b-apro">APROBADO POR CLIENTE</b>
        <i class="rule" style="top:72px"></i>
        <div class="p-row sub-lbl" style="top:84px"><div class="lbl">Repuestos asignados</div></div>
        ${rows}
        <i class="rule sum-rule" style="top:336px"></i>
        <div class="p-row sum" style="top:348px"><div class="lbl">✓ 3 repuestos descontados del inventario</div></div>
      </div>`;
    showBetween(s, A, Z);

    appear(s.querySelector(".bar"), A + 4, Z);
    appear(s.querySelector(".title"), A + 6, Z);
    life(s.querySelector(".plate-bg"), A + 8, Z);
    life(s.querySelector(".ot-num"), A + 12, Z);
    life(s.querySelectorAll(".rule")[0], A + 14, Z);
    appear(s.querySelector(".sub-lbl"), A + 16, Z, 8);

    // Badge: EN RECEPCIÓN -> APROBADO POR CLIENTE (fundido cruzado entre hermanos, cada uno con su opacidad).
    const SW = A + 160;
    life(s.querySelector("#b-recep"), A + 12, SW + 8, 12, 8);
    life(s.querySelector("#b-apro"), SW, Z);

    const names = s.querySelectorAll(".it-name"), stocks = s.querySelectorAll(".it-stock"), chips = s.querySelectorAll(".it-chip"), bars = s.querySelectorAll(".mb");
    this.ITEMS.forEach(([, from, to, cap], i) => {
      const inF = A + 22 + i * 18;          // aparece la fila
      const d = A + 66 + i * 30;            // se descuenta el stock
      appear(names[i], inF, Z);
      life(bars[i], inF + 4, Z);
      // Barra de stock: escala de from/cap a to/cap (solo transform) en 24 frames.
      track(bars[i].firstElementChild, [[0, { transform: `scaleX(${from / cap})` }], [d, { transform: `scaleX(${from / cap})` }, EASE.inOutCubic], [d + 24, { transform: `scaleX(${to / cap})` }]]);
      // Número de stock descontándose en tiempo real (entero registrado + contador CSS).
      life(stocks[i], inF + 6, Z);
      track(stocks[i], [[0, { "--n": from }], [d + 10, { "--n": from }, EASE.step], [d + 11, { "--n": to }]]);
      // Chip "−1" que aparece al descontar.
      track(chips[i], [[0, { opacity: 0, transform: "translateY(6px)" }], [d, { opacity: 0, transform: "translateY(6px)" }, EASE.outCubic], [d + 8, { opacity: 1, transform: "translateY(0)" }], [d + 44, { opacity: 1 }, EASE.inCubic], [d + 54, { opacity: 0 }]]);
    });
    appear(s.querySelector(".sum-rule"), A + 150, Z, 0);
    appear(s.querySelector(".sum"), A + 152, Z, 8);
  },
};
