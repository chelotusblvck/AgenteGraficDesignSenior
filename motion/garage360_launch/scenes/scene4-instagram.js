// ESCENA 4 · Conversión Instagram / outro · frames 330-450
const Scene4Instagram = {
  init() {
    showBetween($("#s4"), 330, 450);
    $("#s4-screen").innerHTML = this.profileHtml();

    // Slide-up del smartphone (330-355), ease-out-cubic.
    track($("#s4-phone"), [
      [330, { transform: "translateY(760px)" }, EASE.outCubic],
      [358, { transform: "translateY(0)" }],
    ]);

    // Tap en el link de la bio (frame 370): pulso 1.0 -> 0.85 -> 1.0 sobre el cursor y el link.
    track($("#s4-tap"), [
      [0, { opacity: 0, transform: "translate(30px, 40px) scale(1)" }],
      [358, { opacity: 0, transform: "translate(30px, 40px) scale(1)" }, EASE.outCubic],
      [368, { opacity: 1, transform: "translate(0, 0) scale(1)" }],
      [370, { opacity: 1, transform: "translate(0, 0) scale(1)" }, EASE.inOutCubic],
      [375, { opacity: 1, transform: "translate(0, 0) scale(0.85)" }, EASE.inOutCubic],
      [380, { opacity: 1, transform: "translate(0, 0) scale(1)" }],
    ]);
    track($("#s4-link"), [
      [370, { transform: "scale(1)" }, EASE.inOutCubic],
      [375, { transform: "scale(0.85)" }, EASE.inOutCubic],
      [380, { transform: "scale(1)" }],
    ]);
    track($("#s4-ripple"), [
      [0, { opacity: 0, transform: "scale(0.4)" }],
      [370, { opacity: 0.7, transform: "scale(0.4)" }, EASE.outCubic],
      [395, { opacity: 0, transform: "scale(2.2)" }],
    ]);
  },

  profileHtml() {
    const tile = (c) => `<i style="background:${c}"></i>`;
    const tiles = ["#2B3036", "#FF5A1F", "#3A4047", "#E6E7E8", "#2B3036", "#3A4047", "#FF5A1F", "#2B3036", "#E6E7E8"].map(tile).join("");
    return `
      <div class="ig-top"><b>garage360.cl</b></div>
      <div class="ig-head">
        <img class="ig-avatar" src="../../brand/logo/garage360-app-icon.svg" alt="">
        <div class="ig-bio">
          <b>Garage360</b>
          <p>Talleres armados para vender.</p>
          <p>Del elevador a la tienda online.</p>
          <div id="s4-linkwrap">
            <span id="s4-link" class="mono">garage360.cl</span>
            <div id="s4-tap"><i id="s4-ripple"></i>
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#111315" stroke-width="2" stroke-linejoin="round"><path d="M9 11V5a2 2 0 0 1 4 0v6l3.5.7a2 2 0 0 1 1.5 2.4L17 20H9l-4-5a1.6 1.6 0 0 1 2.4-2L9 14z" fill="#FFFFFF"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div class="ig-btns"><b class="cta">Escríbenos</b><b>Ver tienda</b></div>
      <div class="ig-grid">${tiles}</div>`;
  },
};
