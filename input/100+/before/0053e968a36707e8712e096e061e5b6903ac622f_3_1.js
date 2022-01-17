function (event, options) {
        if (options.state === 'browse' || restorables.length === 0) {
          restorables = [];
          return;
        }
        
        jQuery('body').data('midgardCreate').showNotification({
          bindTo: '#midgardcreate-edit a',
          gravity: 'TR',
          body: restorables.length + " items on this page have local modifications",
          timeout: 0,
          actions: [
            {
              name: 'restore',
              label: 'Restore',
              cb: function() {
                _.each(restorables, function (instance) {
                  widget._readLocal(instance);
                });
                restorables = [];
              },
              className: 'create-ui-btn'
            },
            {
              name: 'ignore',
              label: 'Ignore',
              cb: function(event, notification) {
                if (widget.options.removeLocalstorageOnIgnore) {
                  _.each(restorables, function (instance) {
                    widget._removeLocal(instance);
                  });
                }
                notification.close();
                restorables = [];
              },
              className: 'create-ui-btn'
            }
          ]
        });
      }