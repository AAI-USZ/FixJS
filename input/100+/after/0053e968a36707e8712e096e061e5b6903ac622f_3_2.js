function () {
      var widget = this;
      var restorables = [];
      var restorer;

      widget.element.bind('midgardeditablechanged', function (event, options) {
        if (_.indexOf(widget.changedModels, options.instance) === -1) {
          widget.changedModels.push(options.instance);
        }
        widget._saveLocal(options.instance);
        jQuery('#midgardcreate-save').button({disabled: false});
      });

      widget.element.bind('midgardeditabledisable', function (event, options) {
        widget._restoreLocal(options.instance);
        jQuery('#midgardcreate-save').hide();
      });

      widget.element.bind('midgardeditableenable', function (event, options) {
        jQuery('#midgardcreate-save').button({disabled: true});
        jQuery('#midgardcreate-save').show();
        if (!options.instance.isNew() && widget._checkLocal(options.instance)) {
          // We have locally-stored modifications, user needs to be asked
          restorables.push(options.instance);
        }

        /*_.each(options.instance.attributes, function (attributeValue, property) {
          if (attributeValue instanceof widget.vie.Collection) {
            widget._readLocalReferences(options.instance, property, attributeValue);
          }
        });*/
      });

      widget.element.bind('midgardcreatestatechange', function (event, options) {
        if (options.state === 'browse' || restorables.length === 0) {
          restorables = [];
          if (restorer) {
            restorer.close();
          }
          return;
        }
        
        restorer = jQuery('body').data('midgardCreate').showNotification({
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
                restorer = null;
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
                restorer = null;
              },
              className: 'create-ui-btn'
            }
          ]
        });
      });

      widget.element.bind('midgardstorageloaded', function (event, options) {
        if (_.indexOf(widget.changedModels, options.instance) === -1) {
          widget.changedModels.push(options.instance);
        }
        jQuery('#midgardcreate-save').button({
          disabled: false
        });
      });
    }