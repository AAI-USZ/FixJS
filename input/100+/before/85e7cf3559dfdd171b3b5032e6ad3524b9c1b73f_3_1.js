function(config) {
    this.initConfig(config);
    if ((config.value != null) && config.value.constructor === Object) {
      this.setValue(config.value);
    }
    if (this.getEager()) {
      if (this.getValue() != null) {
        Ext.Error.raise({
          msg: "Error while configuring '" + (this.getIdentifier()) + "': a 'value' cannot be created eagerly."
        });
      }
      if (!this.getSingleton()) {
        Ext.Error.raise({
          msg: "Error while configuring '" + (this.getIdentifier()) + "': only singletons can be created eagerly."
        });
      }
    }
    if (!this.getSingleton()) {
      if (this.getValue() != null) {
        Ext.Error.raise({
          msg: "Error while configuring '" + (this.getIdentifier()) + "': a 'value' can only be configured as a singleton."
        });
      }
    }
    return this;
  }