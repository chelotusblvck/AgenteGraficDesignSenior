// Orquestación: cada módulo registra sus pistas sobre sus propios elementos.
Hud.init();
Scene1Recepcion.init();
Scene2Diagnostico.init();
Scene3Calidad.init();
Scene4Cierre.init();

// Precarga de fuentes y SVGs: el renderizador espera a window.__ready antes de capturar.
window.__ready = Promise.all([
  document.fonts.load("700 48px 'Barlow Condensed'"),
  document.fonts.load("400 16px Inter"),
  document.fonts.load("600 16px Inter"),
  document.fonts.load("500 16px 'JetBrains Mono'"),
  ...[...document.images].map((i) => i.decode()),
]).then(() => document.fonts.ready);
