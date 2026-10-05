// ESCENA 4 · Cierre, entrega y CTA final · frames 675-900 (CTA desde el frame 780)
const Scene4Cierre = {
  init() {
    const [A, Z] = SCENES.s4;
    const X = CTA_FRAME;          // salida de la notificación / entrada del CTA
    const s = $("#s4");
    s.innerHTML = `
      <i class="bar"></i><h2 class="title">CIERRE Y ENTREGA</h2>
      <div class="notif">
        <i class="plate-bg"></i><i class="stripe"></i>
        <div class="n-head lbl"><span>MotoOps · ahora</span><span>18:00</span></div>
        <div class="n-title">OT COMPLETADA -<br>LISTA PARA RETIRO</div>
        <div class="n-body"><b>#OT-0182</b> · Triumph Street Triple 765 R</div>
        <div class="n-foot"><svg class="n-ck" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" pathLength="1" fill="none" stroke="#FF5A1F" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="lbl">Notificación enviada al cliente</span></div>
      </div>
      <i class="cta-bar"></i>
      <h1 class="cta-h"><span>EQUIPA Y</span><span>DIGITALIZA</span><span>TU TALLER</span></h1>
      <p class="cta-sub">Del elevador a la tienda online</p>
      <div class="cta-url">garage360.cl/motoops</div>`;
    showBetween(s, A, Z);

    // Cierre: notificación al cliente (sale en X con fundido de 10 frames; todo sale del DOM visual).
    appear(s.querySelector(".bar"), A + 4, X);
    appear(s.querySelector(".title"), A + 6, X);
    life(s.querySelector(".notif .plate-bg"), A + 10, X);
    life(s.querySelector(".stripe"), A + 14, X);
    [".n-head", ".n-title", ".n-body", ".n-foot"].forEach((c, i) => appear(s.querySelector(c), A + 20 + i * 14, X, 10));
    const ck = s.querySelector(".n-ck path");
    track(ck, [[0, { strokeDashoffset: 1 }], [A + 74, { strokeDashoffset: 1 }, EASE.outCubic], [A + 90, { strokeDashoffset: 0 }]]);

    // CTA final de marca (entra desde X + 12, con la notificación ya fuera).
    const C = X + 12;
    appear(s.querySelector(".cta-bar"), C, Z, 0);
    s.querySelectorAll(".cta-h span").forEach((sp, i) => appear(sp, C + 6 + i * 8, Z, 18));
    appear(s.querySelector(".cta-sub"), C + 34, Z, 10);
    appear(s.querySelector(".cta-url"), C + 50, Z, 10);
  },
};
