function(element, settings, message) {
          var form, inputErrorField, label, labelErrorField;
          form = $(element[0].form);
          if (element.data('valid') !== false && !(form.find("label.message[for='" + (element.attr('id')) + "']")[0] != null)) {
            inputErrorField = jQuery(settings.input_tag);
            labelErrorField = jQuery(settings.label_tag);
            label = form.find("label[for='" + (element.attr('id')) + "']:not(.message)");
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
          return form.find("label.message[for='" + (element.attr('id')) + "']").text(message);
        }