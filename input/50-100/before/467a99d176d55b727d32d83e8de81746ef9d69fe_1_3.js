function(e) {
      if (self.cantouch) {
        e = e.original ? e.original : e||false;
      } else {
        e = e ? e : window.event||false;
      }
      if (!e) return false;      
      if(e.stopPropagation) e.stopPropagation();
      if(e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.cancel = true;
      e.returnValue = false;
      return false;
    }