function() {
        var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');

        bindings['options.maxLength'].converter = intConverter;
        bindings['options.min'].converter = intConverter;
        bindings['options.max'].converter = intConverter;
        bindings['options.choices'].converter = choiceConverter;
                
        this._modelBinder.bind(this.model, this.el, bindings);
      }