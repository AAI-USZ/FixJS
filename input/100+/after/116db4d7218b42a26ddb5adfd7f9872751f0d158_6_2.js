function(collection) {
          if (collection.models.length === 0) {
            $component.text(componentModel.get('type'));
          } else {
            $component.removeClass('empty');
          }
        }