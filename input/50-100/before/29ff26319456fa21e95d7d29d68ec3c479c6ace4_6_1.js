function($component, type) {
      $component.removeClass(type + '-container');
      $component.removeClass('active');
      $component.addClass('empty');
      $component.empty();
    }