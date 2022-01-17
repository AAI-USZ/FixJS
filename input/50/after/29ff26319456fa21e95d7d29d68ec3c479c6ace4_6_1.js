function(model) {
          $element.tooltip('hide');
          that.resetActiveElement();
          $component.empty();
          $component.data('elementGroup').trigger('reset');
        }