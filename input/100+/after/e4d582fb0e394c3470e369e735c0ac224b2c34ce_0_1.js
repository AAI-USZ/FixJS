function(win) {
      var last = tracker.length-1;
      if (!win) {
        tracker[last].endSession();
        return;
      }
      if (win.tabs.length == 1 && win.tabs[0].url.match(/^chrome(|-devtools):\/\//i)) {
        return;
      }
      if (tracker[last].end === null)
        tracker[last].endSession();
      tracker.push(new session(win.id));
    }