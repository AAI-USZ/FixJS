function(config) {
    this.initConfig(config);
    if (this.getView() instanceof Ext.ClassManager.get('Ext.Component')) {
      this.registeredComponents = {};
      this.isExtJS = this.getView().events != null;
      this.isSenchaTouch = !this.isExtJS;
      if (this.isExtJS) {
        if (this.getView().rendered) {
          this.onViewInitialize();
        } else {
          this.getView().on('afterrender', this.onViewInitialize, this, {
            single: true
          });
        }
      } else {
        if (this.getView().initialized) {
          this.onViewInitialize();
        } else {
          this.getView().on('initialize', this.onViewInitialize, this, {
            single: true
          });
        }
      }
    } else {
      Ext.Error.raise({
        msg: 'Error constructing ViewController: the configured \'view\' is not an Ext.Component.'
      });
    }
    return this;
  }