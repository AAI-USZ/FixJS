function handleCharBinding(e, ch) {
      var handled = lookupKey("'" + ch + "'", options.extraKeys,
                              options.keyMap, function(b) { return doHandleBinding(b, true); });
      if (handled) {
        e_preventDefault(e);
        restartBlink();
      }
      return handled;
    }