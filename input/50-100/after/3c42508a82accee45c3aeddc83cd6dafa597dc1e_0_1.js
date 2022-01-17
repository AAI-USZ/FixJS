function(e) {
      if (window.inAction) {
        return e.preventDefault();
      } else {
        return window.globalDrag = true;
      }
    }