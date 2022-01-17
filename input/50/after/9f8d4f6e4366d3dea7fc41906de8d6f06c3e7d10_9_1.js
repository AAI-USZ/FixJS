function tmpFalse(a) {
    return function(b) {
      return b();
    };
  }