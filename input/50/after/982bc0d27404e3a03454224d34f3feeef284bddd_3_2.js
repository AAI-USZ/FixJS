function(env, cont) {
          state().value = value();
          return cont(_false());
        }