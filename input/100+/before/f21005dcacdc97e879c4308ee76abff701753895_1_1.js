function(element, settings, message) {
          var inputErrorField, label, labelErrorField;
          if (element.data('valid') !== false && !(jQuery("label.message[for='" + (element.attr('id')) + "']")[0] != null)) {
            inputErrorField = jQuery(settings.input_tag);
            labelErrorField = jQuery(settings.label_tag);
            label = jQuery("label[for='" + (element.attr('id')) + "']:not(.message)");
            if (element.attr('autofocus')) {
              element.attr('autofocus', false);
            }
            element.before(inputErrorField);
            inputErrorField.find('span#input_tag').replaceWith(element);
            inputErrorField.find('label.message').attr('for', element.attr('id'));
            labelErrorField.find('label.message').attr('for', element.attr('id'));
            label.replaceWith(labelErrorField);
            labelErrorField.find('label#label_tag').replaceWith(label);
          }
          return jQuery("label.message[for='" + (element.attr('id')) + "']").text(message);
        }