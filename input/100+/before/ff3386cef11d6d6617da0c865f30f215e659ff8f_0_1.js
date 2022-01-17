function(items) {
              if (((items != null ? items.length : void 0) > 0) && (items[0].item != null)) {
                return input.typeahead({
                  source: _.pluck(items, 'item')
                });
              }
            }