function(cloneEvents) {
      var cloned;
      cloned = _CLONE(this);
      if (cloneEvents) {
        cloned._callbacks = this._callbacks;
      } else {
        cloned._callbacks = {};
      }
      return cloned;
    }