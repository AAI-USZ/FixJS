function getCurrent() {
  var d = new Deferred();
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    d.callback(tabs[0]);
  });
  return d;
}