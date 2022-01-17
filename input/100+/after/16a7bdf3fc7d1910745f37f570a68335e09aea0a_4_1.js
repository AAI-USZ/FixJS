function makeViewResultLink(sid) {
  return newNode('a', {'class':"step-view", id:sid + "-view", style:"display: none", click: function(e) {
    window.bridge.getRecordingWindow().location = this.href;
    // We don't actually want the SB window to navigate to the script's page!
    e.preventDefault();
  }}, 'View Result');
}