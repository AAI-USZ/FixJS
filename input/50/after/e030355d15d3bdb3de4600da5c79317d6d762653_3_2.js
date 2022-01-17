function(l) {
      var i;
      i = this._listeners.indexOf(l);
      if (i < 0) {
        return false;
      }
      this._listeners.splice(i, 1);
      return true;
    }