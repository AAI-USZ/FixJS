function($element) {
      var $component = this.$activeComponent;
      var model = $component.data('model');
      var elementGroup = $component.data('elementGroup');

      var level = $element.data('level');
      if (level) {
        level = parseInt(level, 10);
      }

      var elementAttrs = {
        type: $element.data('type'),
        nextId: null,
        name: $element.data('name'),
        src: $element.data('src'),
        level: level
      };

      if ($element.text()) {
        elementAttrs.text = $element.text();
      }

      // if there's no last element, this must be the head
      var last = elementGroup.where({ nextId: null })[0];
      if (!last) {
        elementAttrs.head = true;
      }

      elementGroup.create(elementAttrs, {
        success: function(model) {
          if (last) {
            last.set('nextId', model.id);
            last.save({}, { wait: true });
          }
        },
        wait: true
      });
    }