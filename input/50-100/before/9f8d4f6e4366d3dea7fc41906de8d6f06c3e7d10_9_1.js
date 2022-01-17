function() {
    return function(a) {
      return function(b) {
        return b();
      };
    };
  }