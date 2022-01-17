function() {
  jQuery('#record-panel').hide();
  if (builder.record.recorder) { builder.record.recorder.destroy(); }
  builder.record.recorder = null;
  builder.pageState.removeListener(builder.record.pageLoadListener);
  if (builder.record.selenium1WaitsListener) {
    builder.pageState.removeListener(builder.record.selenium1WaitsListener);
    builder.record.selenium1WaitsListener = null;
  }
  builder.record.recording = false;
}