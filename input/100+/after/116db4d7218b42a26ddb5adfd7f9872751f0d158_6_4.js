function(element, $component) {
      // if component has empty class, nothing has been added to it yet
      if ($component.hasClass('empty')) {
        $component.removeClass('empty');
        // clear out the type label that exists as text inside the component
        $component.text('');
      }

      var templateId = element.get('type') + '-element-template';
      console.log(element.get('type'));
      var elementTemplate = _.template($('#' + templateId).html());

      templateId = element.get('type') + '-popover-template';
      var popoverTemplate = _.template($('#' + templateId).html());

      var elementData = element.toJSON();
      if ($component.data('model').get('type') === 'form') {
        elementData.elementId = this.generateId(element);
      }

      var $element = $(elementTemplate(elementData));
      var row = $component.data('position').row;

      var placement = 'right';
      if (row === 0) {
        placement = 'bottom';
      } else if (row === 2) {
        placement = 'top';
      }

      $element.appendTo($component);
      $element.data('model', element);

      $element.popover({
          title: 'Edit Element',
          trigger: 'manual',
          placement: placement,
          content: popoverTemplate(element.toJSON())
        });
    }