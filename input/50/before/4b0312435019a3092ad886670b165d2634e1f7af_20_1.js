function() {
      Neat.setEnvironment(env);
      if (Neat.env.verbose) {
        puts(("Set environment " + env).yellow);
      }
      return target.apply(null, arguments);
    }