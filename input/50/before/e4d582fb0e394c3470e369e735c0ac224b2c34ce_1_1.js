function(winId) {
  chrome.windows.get(winId, {populate:true}, VisibilityTracker.winChanged);
}