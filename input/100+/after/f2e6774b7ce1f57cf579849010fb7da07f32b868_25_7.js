function recentsSetup(evt) {
  window.removeEventListener('load', recentsSetup);
  Recents.init();
}