function() {
  if (builder.record.verifyExploring) {
    builder.record.verifyExploring = false;
    builder.record.verifyExplorer.destroy();
    builder.record.verifyExplorer = null;
  }
  if (builder.record.recording) {
    builder.record.stop();
  }
}