function() {
  builder.dialogs.runall.requestStop = true;
  jQuery('#suite-playback-stop').hide();
  try {
    builder.dialogs.runall.currentPlayback.stopTest();
  } catch (e) {
    // In case we haven't actually started or have already finished, we don't really care if this
    // goes wrong.
  }
}