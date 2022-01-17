function bglog(msg) {
  if (chrome.extension.getBackgroundPage()) {
    chrome.extension.getBackgroundPage().console.log(msg);
  } else if (window.console) {
    window.console.log(msg);
  }
}