function($component) {
      var model = $component.data('model');
      model.destroy();
      $component.removeClass(model.get('type') + '-container');

      $component.removeClass('active');
      $component.addClass('empty');
      $component.empty();
    }