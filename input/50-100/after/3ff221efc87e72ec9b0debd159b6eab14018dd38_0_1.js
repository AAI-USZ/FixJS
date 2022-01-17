function() {
  if (bridge.recordingTab) {
    bridge.recordingTab.style.setProperty("background-color", null, null);
  }
  if (bridge.recorderWindow) {
    bridge.recorderWindow.close();
  }
  bridge.recorderWindow = null;
}