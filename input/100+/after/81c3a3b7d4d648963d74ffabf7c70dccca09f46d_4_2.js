function($form) {
      var that = this;
      var $component = this.$activeComponent;

      var model = $component.data('model');
      var config = $form.serializeObject();

      var $formSubmit = $('[type="submit"]');
      var $confirmIcon = $('.icon-ok');

      $formSubmit.attr('disabled', 'true');
      $confirmIcon.hide();
      model.set(config);

      model.save({}, {
        error: tooltipErrorHandler($form, 'right'),
        success: function(component) {
          $formSubmit.removeAttr('disabled');
          $confirmIcon.show();

          setTimeout(function() {
            $confirmIcon.hide();
          }, 1500);
        },
        wait: true
      });
    }