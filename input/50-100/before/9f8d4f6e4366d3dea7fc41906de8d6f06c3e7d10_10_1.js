function processResult(result, env, next) {
    next = next != null ? next : nextFunc;
    if ((getType(result)) === 'monad') {
      console.log("RESULT IS A MONAD");
      return Prim.runMonad(result, env != null ? env : Prim.defaultEnv, function() {
        return next();
      });
    } else {
      console.log("RESULT IS NOT A MONAD, IT'S " + (getType(result)) + ": " + result);
      return next();
    }
  }