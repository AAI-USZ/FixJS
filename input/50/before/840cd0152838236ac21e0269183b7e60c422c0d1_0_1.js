function = function(fn) {
      var key, value;
      for (key in this) {
        value = this[key];
        if (value === fn) return key;
      }
    }