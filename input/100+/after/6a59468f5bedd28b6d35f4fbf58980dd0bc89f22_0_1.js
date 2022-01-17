function(config) {
    if (config == null) {
      config = {};
    }
    if (config.view) {
      this.controlView(config.view);
    }
    return this.initConfig(config);
  }