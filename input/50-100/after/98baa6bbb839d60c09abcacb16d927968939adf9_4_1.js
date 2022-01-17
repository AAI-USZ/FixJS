function s_removeBoundChan(win, origin, scope) {
      var arr = s_boundChans[origin][scope];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].win === win) {
          arr.splice(i,1);
        }
      }
      if (s_boundChans[origin][scope].length === 0) {
        delete s_boundChans[origin][scope];
      }
    }