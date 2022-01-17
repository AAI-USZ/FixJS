function(data) {
      var provider;
      var autoSubmit;
      var params = data.params;

      if (params.id) {
        this.model = this._updateModel(params.id);
        this.completeUrl = '/settings/';
      } else if (params.preset) {
        this.model = this._createModel(params.preset);
        this.completeUrl = '/settings/';
      }

      if (this.model.hasOwnProperty('provider')) {
        provider = this.model.provider;
        autoSubmit = !provider.useCredentials && !provider.useUrl;
      }

      // when provider requires no credentials
      // auto submit form (which will also redirect)
      if (provider && autoSubmit) {
        this.save();
      } else {
        this.render();
      }
    }