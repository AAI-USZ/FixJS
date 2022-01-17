function(i, handler){
        result = handler.proxy(e);
        if (e.isImmediatePropagationStopped()) return false;
      }