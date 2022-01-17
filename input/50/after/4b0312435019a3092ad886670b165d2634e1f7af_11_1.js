function(logger, log) {
      if (log.level >= config.verbosity) {
        return print(log.message);
      }
    }