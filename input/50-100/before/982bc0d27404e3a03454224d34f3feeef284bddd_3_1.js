function(env, cont) {
        if (msg() !== _nil()) env.write("" + (msg()) + "\n");
        return cont(_false());
      }