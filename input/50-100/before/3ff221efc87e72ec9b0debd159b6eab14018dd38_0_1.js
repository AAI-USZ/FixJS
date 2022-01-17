function() {
  if (bridge.recordingTab) {
    bridge.recordingTab.style.setProperty("background-color", null, null);
  }
  if (bridge.recorderWindow) {
    recorderWindow.close();
  }
  recorderWindow = null;
}