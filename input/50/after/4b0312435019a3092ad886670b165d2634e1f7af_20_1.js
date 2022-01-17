function() {
      Neat.setEnvironment(env);
      puts(("Set environment " + env).yellow, 1);
      return target.apply(null, arguments);
    }