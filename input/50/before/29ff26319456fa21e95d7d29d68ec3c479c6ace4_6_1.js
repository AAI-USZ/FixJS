function(model) {
          that.resetActiveElement();
          $component.empty();
          $component.data('elementGroup').trigger('reset');
        }