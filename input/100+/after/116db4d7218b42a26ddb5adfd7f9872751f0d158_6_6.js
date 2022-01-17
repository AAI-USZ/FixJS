function() {
      var that = this;
      var $element = this.$activeElement;
      var $component = $element.parent();
      var model = $element.data('model');

      var $popover = $element.data('popover').tip();
      var updatedProperties = $('form', $popover).serializeObject();

      model.set(updatedProperties);
      model.save({}, {
        error: tooltipErrorHandler($element, 'right'),
        success: function(model) {
          $element.tooltip('hide');
          that.resetActiveElement();
          $component.empty();
          $component.data('elementGroup').trigger('reset');
        },
        wait: true
      });
    }