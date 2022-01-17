function(items) {
              if (((items != null ? items.length : void 0) > 0) && (items[0].item != null)) {
                input.typeahead({
                  source: _.pluck(items, 'item')
                });
              }
              return _this.query.on('cancel:add-constraint', function() {
                var _ref1;
                return (_ref1 = input.data('typeahead')) != null ? _ref1.$menu.remove() : void 0;
              });
            }