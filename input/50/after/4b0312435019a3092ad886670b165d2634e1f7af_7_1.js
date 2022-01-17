function(config) {
    config.verbosity = 0;
    config.engines = {
      templates: {},
      databases: {},
      tests: {},
      logging: {}
    };
    return config.defaultLoggingEngine = 'console';
  }