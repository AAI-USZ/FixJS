function right(value) {
    return function(a) {
      return function(b) {
        return a()(function() {
          return value;
        });
      };
    };
  }