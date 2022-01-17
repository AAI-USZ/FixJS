function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    }