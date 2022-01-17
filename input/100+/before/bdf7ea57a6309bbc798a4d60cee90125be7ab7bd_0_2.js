function close(msg) {
    var tab = arguments[arguments.length - 1];
    Tab.current_closed_tab = tab;

    if (msg.count == 1) {
      delete msg.count;
    }

    //      count: 'v.index >= tab.index'
    var cond = msg.type

    if (cond || msg.count > 1) {
      chrome.windows.getAll({
        populate: true
      }, function(windows) {
        if (!msg.otherWindows) {
          windows = _.filter(windows, function(w) {
            return w.id === tab.windowId;
          })
        }
        _.each(windows, function(w) {
          var tabs = w.tabs
          tabs = _.filter(tabs, function(v) {

            closeMap = {
              closeOther: v.id == tab.id || v.pinned,
              closeLeft: v.id == tab.id || v.pinned || tab.index < v.index,
              closeRight: v.id == tab.id || v.pinned || tab.index > v.index,
              closePinned: !v.pinned,
              closeUnPinned: v.pinned,
              otherWindows: v.windowId == tab.windowId || v.pinned,
              count: v.index >= tab.index
            }
            return !closeMap[cond]
          })
          _.each(tabs, function(v, k) {
            if (msg.count && k > msg.count) return;
            chrome.tabs.remove(v.id)
          })
        })
      })
    } else {
      chrome.tabs.remove(tab.id);
      if (msg.focusLast) {
        selectPrevious.apply('', arguments);
      } // close and select right
      if (msg.offset) {
        select.apply('', arguments);
      } // close and select left
    }
  }