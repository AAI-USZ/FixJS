function(element, settings) {
          var errorFieldClass, form, inputErrorField, label, labelErrorField;
          form = $(element[0].form);
          errorFieldClass = jQuery(settings.input_tag).attr('class');
          inputErrorField = element.closest("." + (errorFieldClass.replace(" ", ".")));
          label = form.find("label[for='" + (element.attr('id')) + "']:not(.message)");
          labelErrorField = label.closest("." + errorFieldClass);
          if (inputErrorField[0]) {
            inputErrorField.find("#" + (element.attr('id'))).detach();
            inputErrorField.replaceWith(element);
            label.detach();
            return labelErrorField.replaceWith(label);
          }
        }