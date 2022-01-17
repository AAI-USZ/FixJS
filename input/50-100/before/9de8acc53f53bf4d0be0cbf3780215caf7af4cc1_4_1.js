function runMonad(monad, env, cont) {
    if (monad.cmd != null) {
      return monad.cmd(env, continueMonad(cont));
    } else {
      return cont(monad);
    }
  }