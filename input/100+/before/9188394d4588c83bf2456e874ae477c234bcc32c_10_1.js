function(data) {
      var params = data.params;
      var self = this;

      if (params.id) {
        self.model = this._updateModel(params.id);
        this.completeUrl = '/settings/';
      } else if (params.preset) {
        self.model = this._createModel(params.preset);
        this.completeUrl = '/settings/';
      }

      self.render();
    }