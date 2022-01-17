function(config) {
    config.verbose = false;
    config.engines = {
      templates: {},
      databases: {},
      tests: {},
      logging: {}
    };
    return config.defaultLoggingEngine = 'console';
  }