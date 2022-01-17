function() {
    return function(name) {
      return makeMonad(function(env, cont) {
        return cont(values[name()]);
      });
    };
  }