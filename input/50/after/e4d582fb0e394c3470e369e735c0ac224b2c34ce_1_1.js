function(winId) {
  if (winId == chrome.windows.WINDOW_ID_NONE) {
    VisibilityTracker.winChanged();    
  } else {
    chrome.windows.get(winId, {populate:true}, VisibilityTracker.winChanged);
  }
}