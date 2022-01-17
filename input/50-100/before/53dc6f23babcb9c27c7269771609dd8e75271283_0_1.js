function(w) {
    chrome.tabs.getSelected(w.id, function(tab) {
      d.callback(tab);
    });
  }