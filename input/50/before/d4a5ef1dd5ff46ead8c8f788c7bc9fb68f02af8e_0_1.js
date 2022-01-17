function(cloneEvents) {
      var cloned;
      cloned = _CLONE(this);
      if (!cloneEvents) {
        cloned._callbacks = {};
      }
      return cloned;
    }