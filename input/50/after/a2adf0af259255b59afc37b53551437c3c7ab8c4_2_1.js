f        // if (element.val() != jQuery('#' + element.attr('id') + '_confirmation').val()) {
        var confirmationFieldValue = jQuery('#' + element.attr('id') + '_confirmation').val();
        if (confirmationFieldValue && element.val() !== confirmationFieldValue) {
          return options.message;
        }
      }
