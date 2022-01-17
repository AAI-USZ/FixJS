function() {
  for (var i = 0; i < builder.preShutdownHooks.length; i++) {
    try {
      builder.preShutdownHooks[i]();
    } catch (e) { dump(e); }
  }
  window.bridge.recorderWindow = null; // As we're closing it ourselves just now, shutdown doesn't have to.
  window.bridge.shutdown();
}