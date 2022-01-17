function($element) {
        if (!$element.is($.in_field.support_types)) {
          throw new Error('Element not supported.');
        }
      }