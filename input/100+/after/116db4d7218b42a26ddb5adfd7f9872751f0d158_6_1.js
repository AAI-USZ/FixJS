function(event, ui) {
          var $this = $(this);
          var $component = $(ui.draggable);

          var componentType = $component.data('type');
          var existingModel = $this.data('model');

          // reset component position, since it was just dragged
          $component.css({ top: 0, left: 0 });

          // remove any existing component if its type is different from the
          // one being added; otherwise, simply select the component
          if (existingModel) {
            if (existingModel.get('type') === componentType) {
              layoutView.selectComponentElement($this, existingModel);
              return false;
            } else {
              layoutView.resetComponentElement($this);
            }
          }

          componentGroup.create({
            layout: $this.data('position'),
            type: $component.data('type')
          }, {
            success: function(model) {
              layoutView.selectComponentElement($this, model);
            },

            // wait for server to respond to get id of component
            wait: true
          });

          // reset component position, since it was just dragged
          $component.css({
            top: 0,
            left: 0
          });
          return false;
        }