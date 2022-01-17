function(event, notification) {
                if (widget.options.removeLocalstorageOnIgnore) {
                  _.each(restorables, function (instance) {
                    widget._removeLocal(instance);
                  });
                }
                notification.close();
                restorables = [];
                restorer = null;
              }