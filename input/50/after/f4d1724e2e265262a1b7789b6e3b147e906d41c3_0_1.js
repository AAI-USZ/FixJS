function(attributes) {
        this._modelBinder = new Backbone.ModelBinder();
        this.library = attributes.library;
        this.render();
        this.fileInput = this.$('input[type="file"]').get(0);
      }