function(v) {

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
          }