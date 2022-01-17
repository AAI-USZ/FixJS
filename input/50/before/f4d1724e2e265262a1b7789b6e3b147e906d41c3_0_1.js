function(attributes) {
        this._modelBinder = new Backbone.ModelBinder();
        this.library = attributes.library;
        this.render();
      }