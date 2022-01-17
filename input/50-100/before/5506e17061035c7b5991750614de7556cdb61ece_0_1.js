function() {
        this.table = this.$('tbody');
      
        this._modelBinder = new Backbone.ModelBinder();
      
        this.newFieldView = new NewFieldView({
          model: new Field
        });
      
        this.model.get('fields').bind('add', this.onNewField, this);
      
        this.render();
      }