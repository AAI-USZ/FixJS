function (property, id) {
        if (property.type !== 'NestedModel' && property.listType !== 'NestedModel') {
          return;
        }

        var value = entity.get(id);
        if (value) {
          schema[id].model = value;
          return;
        }
        schema[id].model = new entity.vie.Entity({
          '@type': property.nestedModelType
        });
      }