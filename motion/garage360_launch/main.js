// Orquestación: cada módulo de escena registra sus propias pistas sobre sus propios elementos.
Scene1Intro.init();
Scene2Tablet.init();
Scene3Cta.init();
Scene4Instagram.init();

// Velo final: único responsable del fundido a negro de los últimos 15 frames.
track($("#endveil"), [[0, { opacity: 0 }], [435, { opacity: 0 }, EASE.inOutCubic], [450, { opacity: 1 }]]);

// Precarga de SVGs/fuentes: el renderizador espera a window.__ready antes de capturar.
window.__ready = Promise.all([
  document.fonts.load("700 48px 'Barlow Condensed'"),
  document.fonts.load("600 16px 'Barlow Condensed'"),
  document.fonts.load("400 16px Inter"),
  document.fonts.load("500 16px Inter"),
  document.fonts.load("600 16px Inter"),
  document.fonts.load("500 16px 'JetBrains Mono'"),
  ...[...document.images].map((i) => i.decode()),
]).then(() => document.fonts.ready);
