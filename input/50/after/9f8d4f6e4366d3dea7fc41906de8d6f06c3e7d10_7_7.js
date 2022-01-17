function() {
    return function(l) {
      return l().head();
    };
  }