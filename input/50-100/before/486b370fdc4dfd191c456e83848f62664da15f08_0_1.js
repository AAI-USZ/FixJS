function() {
  if (builder.record.recording) {
    builder.record.stop();
  }
  if (builder.record.verifyExploring) {
    builder.record.stopVerifyExploring();
  }
}