function() {
  window.bridge.recorderWindow = null; // As we're closing it ourselves just now, shutdown doesn't have to.
  window.bridge.shutdown();
}