function dateFields(model) {
        return _.filter(model.constructor.metadata.fields, function(field) {
          return field.type == 'Date'
        });
      }