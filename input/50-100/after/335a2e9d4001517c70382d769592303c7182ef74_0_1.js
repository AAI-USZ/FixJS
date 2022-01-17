function (property, id) {
        if (property.type !== 'NestedModel' && property.listType !== 'NestedModel') {
          return;
        }
        schema[id].model = entity.vie.getTypedEntityClass(property.nestedModelType);
      }