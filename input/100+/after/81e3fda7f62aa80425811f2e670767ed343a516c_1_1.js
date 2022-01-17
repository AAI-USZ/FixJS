function (data) {
      if (this.options.widgets[data.property] !== undefined) {
        // Widget configuration set for specific RDF predicate
        return this.options.widgets[data.property];
      }

      // Load the widget configuration for the data type
      // TODO: make sure type is already loaded into VIE
      var propertyType = 'default';
      var type = this.options.model.get('@type');
      if (type) {
        if (type.attributes && type.attributes.get(data.property)) {
          propertyType = type.attributes.get(data.property).range[0];
        }
      }
      if (this.options.widgets[propertyType] !== undefined) {
        return this.options.widgets[propertyType];
      }
      return this.options.widgets['default'];
    }