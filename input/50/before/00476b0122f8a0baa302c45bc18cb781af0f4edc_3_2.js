function(name) {
      return function(a, b) {
        return math[name](this, a, b);
      }
    }