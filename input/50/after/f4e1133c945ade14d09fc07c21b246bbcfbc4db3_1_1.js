function() {
    return function(filter) {
      return makeMonad(function(env, cont) {
        Parse.defaultScanner.addFilter(filter());
        return cont(tmpFalse);
      });
    };
  }