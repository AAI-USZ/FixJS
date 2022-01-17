function() {
    return function(a) {
      return function(b) {
        return a() + b();
      };
    };
  }