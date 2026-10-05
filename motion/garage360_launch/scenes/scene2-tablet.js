// ESCENA 2 · Tablet con UI MotoOps y AutoOps · frames 75-225
// 75-90 fade-in · 100-125 zoom a OT de MotoOps · 140-165 zoom-out + cambio a AutoOps
// 175-195 zoom a OT de AutoOps · 195-215 zoom-out · el velo de la escena 3 cubre 215-225
const Scene2Tablet = {
  init() {
    $("#s2-moto").innerHTML = this.screenHtml("moto");
    $("#s2-auto").innerHTML = this.screenHtml("auto");
    showBetween($("#s2"), 75, 225);

    // Opacidad solo en #s2-tablet; la cámara (#s2-camera) usa solo transform.
    track($("#s2-tablet"), [[0, { opacity: 0 }], [75, { opacity: 0 }, EASE.outCubic], [90, { opacity: 1 }]]);

    // Cambio de pantalla: dos capas hermanas con opacidad propia (sin contenedor animado).
    track($("#s2-moto"), [[0, { opacity: 1 }], [148, { opacity: 1 }, EASE.inOutCubic], [160, { opacity: 0 }]]);
    track($("#s2-auto"), [[0, { opacity: 0 }], [148, { opacity: 0 }, EASE.inOutCubic], [160, { opacity: 1 }]]);

    // Cámara 2.5D: inclinación suave que se aplana al acercarse a las tarjetas de OT.
    const tilt = (s, rx, ry) => `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`;
    track($("#s2-camera"), [
      [75, { transform: tilt(1, 8, -12) }, EASE.linear],
      [100, { transform: tilt(1, 5, -8) }, EASE.inOutCubic],
      [125, { transform: tilt(1.45, 0, 0) }, EASE.linear],
      [140, { transform: tilt(1.45, 0, 0) }, EASE.inOutCubic],
      [165, { transform: tilt(1, 4, 10) }, EASE.linear],
      [175, { transform: tilt(1, 4, 10) }, EASE.inOutCubic],
      [195, { transform: tilt(1.45, 0, 0) }, EASE.linear],
      [205, { transform: tilt(1.45, 0, 0) }, EASE.inOutCubic],
      [225, { transform: tilt(1.2, 2, 4) }],
    ]);
  },

  screenHtml(brand) {
    const auto = brand === "auto";
    const ot = (code, name, task, badge, cls) => `
      <article class="plate ot">
        <header><span class="mono">${code}</span><b class="badge ${cls}">${badge}</b></header>
        <h3>${name}</h3><p>${task}</p>
      </article>`;
    const rows = auto
      ? [["OT-0207", "Chevrolet Sail", "Cambio de pastillas de freno", "EN TALLER", "b-blue"],
         ["OT-0208", "Toyota Yaris", "Mantención de 10.000 km", "ESPERA", "b-amber"],
         ["OT-0209", "Hyundai Accent", "Alineación y balanceo", "LISTA", "b-green"]]
      : [["OT-0412", "Honda CB190", "Cambio de aceite y filtro", "EN TALLER", "b-orange"],
         ["OT-0413", "Yamaha FZ 150", "Frenos delanteros", "ESPERA", "b-amber"],
         ["OT-0414", "Moto de reparto", "Revisión de cadena", "LISTA", "b-green"]];
    const stock = auto
      ? [["Filtro de aceite", "STOCK OK", "b-green"], ["Bujías", "STOCK BAJO", "b-amber"], ["Batería 12V", "AGOTADO", "b-red"]]
      : [["Aceite 10W-40", "STOCK OK", "b-green"], ["Pastillas de freno", "STOCK BAJO", "b-orange"], ["Casco integral", "AGOTADO", "b-red"]];
    return `
      <div class="ui ${auto ? "ui-auto" : ""}">
        <div class="ui-top"><span class="ui-logo">${auto ? "AutoOps" : "MotoOps"}</span><span class="mono ui-date">MESÓN · HOY</span></div>
        <div class="ui-tabs"><b class="on">Tablero OT</b><b>Stock</b><b>Venta</b></div>
        <div id="ui-ots">${rows.map((r) => ot(...r)).join("")}</div>
        <div class="ui-sub">STOCK DE MESÓN</div>
        <div class="ui-stock">${stock.map(([n, b, c]) => `<div class="plate stock"><span>${n}</span><b class="badge ${c}">${b}</b></div>`).join("")}</div>
      </div>`;
  },
};
