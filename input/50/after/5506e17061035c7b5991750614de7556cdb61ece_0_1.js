function(attributes) {
        this._modelBinder = new Backbone.ModelBinder();
        this.settings = attributes.settings;
        this.render();
      }