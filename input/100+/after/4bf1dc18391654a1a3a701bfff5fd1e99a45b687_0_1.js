get currentTabTitle() {
  var tabbrowser = document.getElementById("content");
  return tabbrowser.mCurrentBrowser.contentTitle;
},
