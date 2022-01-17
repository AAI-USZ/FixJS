function() {
      return this.map(function(model){ return model.toJSON(); });
    }