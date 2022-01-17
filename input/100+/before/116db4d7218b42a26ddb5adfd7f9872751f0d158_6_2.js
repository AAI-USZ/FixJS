function(componentModel) {
      var layout = componentModel.get('layout');
      var selector = '[data-position="' + layout.row + ':' + layout.col +'"]';
      var $component = this.$(selector);

      $component.data('model', componentModel);
      $component.data('type', componentModel.get('type'));
      $component.addClass(componentModel.get('type') + '-container');

      var elementGroup = new ElementGroup([], { componentId: componentModel.id });
      var that = this;

      // add and reset element handlers require both the element and
      // its corresponding parent component
      elementGroup.bind('add', function(element) {
        that.addElement(element, $component);
      }, this);

      elementGroup.bind('reset', function() {
        that.addAllElements($component);
      }, this);

      $component.data('elementGroup', elementGroup);
      // get the elements for this component
      elementGroup.fetch({
        // TODO: handle error
        success: function(collection) {
          if (collection.models.length === 0) {
            $component.text(componentModel.get('type'));
          } else {
            $component.removeClass('empty');
          }
        }
      });
    }