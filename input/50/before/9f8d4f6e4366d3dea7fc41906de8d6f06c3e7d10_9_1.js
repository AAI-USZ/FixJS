function() {
    return function(token) {
      return makeMonad(function(env, cont) {
        Parse.defToken(token());
        return cont(_false());
      });
    };
  }