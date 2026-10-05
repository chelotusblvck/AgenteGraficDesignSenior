// ESCENA 3 · Vista del cliente · frames 450-675
// El cliente sigue su moto desde el celular: avance de la OT, fotos del trabajo, insumos usados y monto (ficticio).
const Scene3Cliente = {
  PHOTOS: [
    ["Moto en elevador", "10:15"],
    ["Frenos y disco", "12:40"],
    ["Cambio de aceite", "13:05"],
  ],
  // [nombre, cantidad, precio CLP]
  ITEMS: [
    ["Aceite 5W30", "1 u", "$18.900"],
    ["Filtro de aceite", "1 u", "$7.500"],
    ["Pastillas de freno", "1 u", "$24.900"],
    ["Mano de obra", "—", "$35.000"],
  ],
  TOTAL: [86, 300], // $86.300 = 18.900 + 7.500 + 24.900 + 35.000

  art(i) {
    const line = 'fill="none" stroke="#E6E7E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    const arts = [
      // moto sobre elevador
      `<line x1="14" y1="80" x2="129" y2="80" ${line}/><line x1="30" y1="80" x2="30" y2="70" ${line}/><line x1="113" y1="80" x2="113" y2="70" ${line}/>
       <circle cx="42" cy="58" r="13" ${line}/><circle cx="102" cy="58" r="13" ${line}/>
       <path d="M42 58 L62 40 L88 40 L102 58 M62 40 L56 32 L48 32 M88 40 L94 30 L102 30" ${line}/><path d="M62 40 L88 40 L84 32 L66 32 Z" fill="#FF5A1F" stroke="#FF5A1F" stroke-width="2" stroke-linejoin="round"/>`,
      // freno / disco
      `<circle cx="72" cy="48" r="34" ${line}/><circle cx="72" cy="48" r="22" ${line}/><circle cx="72" cy="48" r="5" ${line}/>
       <path d="M72 26 v-6 M72 70 v6 M50 48 h-6 M94 48 h6" ${line}/><path d="M96 24 a34 34 0 0 1 8 14 l-10 4 a22 22 0 0 0-5-9 z" fill="#FF5A1F" stroke="#FF5A1F" stroke-width="2" stroke-linejoin="round"/>`,
      // cambio de aceite
      `<rect x="40" y="16" width="64" height="38" rx="6" ${line}/><circle cx="72" cy="35" r="7" ${line}/><path d="M72 54 v8" ${line}/>
       <path d="M72 64 q-6 8 0 12 q6-4 0-12 z" fill="#FF5A1F" stroke="#FF5A1F" stroke-width="1.5" stroke-linejoin="round"/><path d="M52 82 h40" ${line}/>`,
    ];
    return `<svg viewBox="0 0 143 96" width="143" height="96">${arts[i]}</svg>`;
  },

  init() {
    const [A, Z] = SCENES.s3;
    const s = $("#s3");
    const photos = this.PHOTOS.map(([cap, h], i) => `<div class="photo" style="left:${16 + i * 150.5}px">${this.art(i)}<span class="mono">${cap.toUpperCase()} · ${h}</span></div>`).join("");
    const items = this.ITEMS.map(([n, q, p], i) => `<div class="p-row inv" style="top:${276 + i * 34}px"><span>${n}</span><em class="mono">${q}</em><b class="mono">${p}</b></div>`).join("");
    s.innerHTML = `
      <i class="bar"></i><h2 class="title">VISTA DEL CLIENTE</h2>
      <div class="plate" style="height:478px">
        <i class="plate-bg"></i>
        <div class="p-row hd" style="top:14px"><div class="lbl">Seguimiento de tu moto</div><div class="val" style="font-size:16px">Triumph Street Triple 765 R</div></div>
        <b class="badge b-accent" id="b-cli">EN TALLER</b>
        <i class="rule" style="top:68px"></i>
        <div class="p-row pg" style="top:80px">
          ${["Recepción", "Diagnóstico", "En taller", "Listo"].map((l, i) => `<div class="pg-i ${i < 2 ? "done" : i === 2 ? "now" : ""}"><i></i><span class="mono">${l.toUpperCase()}</span></div>`).join("")}
        </div>
        <i class="rule" style="top:124px"></i>
        <div class="p-row ph-lbl" style="top:134px"><div class="lbl">Fotos de tu moto en el taller</div></div>
        ${photos}
        <div class="p-row in-lbl" style="top:254px"><div class="lbl">Insumos usados</div></div>
        ${items}
        <i class="rule tot-rule" style="top:418px"></i>
        <div class="tot-row" style="top:428px"><span class="lbl">Total referencial</span><span class="tot mono"><span class="num-n"></span><span class="num-m"></span></span></div>
      </div>`;
    showBetween(s, A, Z);

    appear(s.querySelector(".bar"), A + 4, Z);
    appear(s.querySelector(".title"), A + 6, Z);
    life(s.querySelector(".plate-bg"), A + 8, Z);
    appear(s.querySelector(".hd"), A + 14, Z, 8);
    appear(s.querySelector("#b-cli"), A + 18, Z, 6);
    life(s.querySelectorAll(".rule")[0], A + 20, Z);
    appear(s.querySelector(".pg"), A + 26, Z, 8);
    life(s.querySelectorAll(".rule")[1], A + 34, Z);
    appear(s.querySelector(".ph-lbl"), A + 38, Z, 8);
    // Fotos del trabajo: entran de a una, con leve escala.
    s.querySelectorAll(".photo").forEach((p, i) => {
      const f = A + 46 + i * 16;
      life(p, f, Z);
      track(p, [[0, { transform: "scale(0.94)" }, EASE.outCubic], [f, { transform: "scale(0.94)" }, EASE.outCubic], [f + 16, { transform: "scale(1)" }]]);
    });
    // Insumos usados y total ficticio con conteo.
    appear(s.querySelector(".in-lbl"), A + 98, Z, 8);
    s.querySelectorAll(".inv").forEach((r, i) => appear(r, A + 108 + i * 12, Z, 8));
    appear(s.querySelector(".tot-rule"), A + 158, Z, 0);
    const row = s.querySelector(".tot-row");
    life(row.querySelector(".lbl"), A + 162, Z);
    const tot = row.querySelector(".tot");
    life(tot, A + 162, Z);
    // Conteo hasta $86.300 (miles y centenas como enteros registrados --n / --m).
    const [a, b] = this.TOTAL;
    track(tot, [[0, { "--n": 0, "--m": 0 }], [A + 166, { "--n": 0, "--m": 0 }, EASE.outCubic], [A + 200, { "--n": a, "--m": b }]]);
  },
};
