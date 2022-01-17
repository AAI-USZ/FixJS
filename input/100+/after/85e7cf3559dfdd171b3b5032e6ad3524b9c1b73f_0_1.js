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
      if (this.getClassName() != null) {
        if (Ext.ClassManager.get(this.getClassName()).singleton) {
          Ext.Error.raise({
            msg: "Error while configuring rule for '" + (this.getIdentifier()) + "': singleton classes cannot be configured for injection as a prototype. Consider removing 'singleton: true' from the class definition."
          });
        }
      }
      if (this.getValue() != null) {
        Ext.Error.raise({
          msg: "Error while configuring '" + (this.getIdentifier()) + "': a 'value' can only be configured as a singleton."
        });
      }
    } else {
      if ((this.getClassName() != null) && (this.getParameters() != null)) {
        if (Ext.ClassManager.get(this.getClassName()).singleton) {
          Ext.Error.raise({
            msg: "Error while configuring rule for '" + (this.getIdentifier()) + "': parameters cannot be applied to singleton classes. Consider removing 'singleton: true' from the class definition."
          });
        }
      }
    }
    return this;
  }