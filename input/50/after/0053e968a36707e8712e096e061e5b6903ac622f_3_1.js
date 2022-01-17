function() {
                _.each(restorables, function (instance) {
                  widget._readLocal(instance);
                });
                restorables = [];
                restorer = null;
              }