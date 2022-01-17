function(element, options) {
        if (element.val() != jQuery('#' + element.attr('id') + '_confirmation').val()) {
          return options.message;
        }
      }