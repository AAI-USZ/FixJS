function(win) {
      if (win.tabs.length == 1 && win.tabs[0].url.match(/^chrome(|-devtools):\/\//i)) {
        return;
      }
      var last = tracker.length-1;
      if (win.id == chrome.windows.WINDOW_ID_NONE) {
        tracker[last].endSession();
      } else {
        if (tracker[last].end == null)
          tracker[last].endSession();
        tracker.push(new session(win.id));
      }
    }