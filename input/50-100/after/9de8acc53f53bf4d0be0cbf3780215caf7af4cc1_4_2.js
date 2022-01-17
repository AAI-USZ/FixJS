function() {
    return function(name) {
      return function(defaultValue) {
        return makeMonad(function(env, cont) {
          var _ref;
          return cont((_ref = values[name()]) != null ? _ref : defaultValue());
        });
      };
    };
  }