function(open) {
      return function(close) {
        return makeMonad(function(env, cont) {
          Parse.defGroup(open(), close());
          return cont(_false());
        });
      };
    }