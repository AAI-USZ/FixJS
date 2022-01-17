function() {
      var that = this;
      var $element = this.$activeElement;
      var $component = $element.parent();
      var model = $element.data('model');

      var $popover = $element.data('popover').tip();
      var updatedProperties = $('form', $popover).serializeObject();

      // TODO: handle set and save errors
      model.set(updatedProperties);
      model.save({}, {
        success: function(model) {
          that.resetActiveElement();
          $component.empty();
          $component.data('elementGroup').trigger('reset');
        }
      });
    }