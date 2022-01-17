function runMonad(monad, env, cont) {
    try {
      if (monad.cmd != null) {
        return monad.cmd(env, continueMonad(cont));
      } else {
        return cont(monad);
      }
    } catch (err) {
      return console.log("ERROR RUNNING MONAD: " + err.stack);
    }
  }