function() {
        var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');

        this.model.constructor.metadata.fields.forEach(function(field) {
          switch (field.type) {
            case 'Number':
              bindings[field.name].converter = numberConverter;
              break;
            case 'Date':
              bindings[field.name].converter = dateConverter;
              break;
            case 'Boolean':
              bindings[field.name].converter = booleanConverter;
              break;
          }
        })

        this._modelBinder.bind(this.model, this.el, bindings);
      }