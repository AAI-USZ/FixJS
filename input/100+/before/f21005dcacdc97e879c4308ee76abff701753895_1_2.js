function(element, settings) {
          var errorFieldClass, inputErrorField, label, labelErrorField;
          errorFieldClass = jQuery(settings.input_tag).attr('class');
          inputErrorField = element.closest("." + (errorFieldClass.replace(" ", ".")));
          label = jQuery("label[for='" + (element.attr('id')) + "']:not(.message)");
          labelErrorField = label.closest("." + errorFieldClass);
          if (inputErrorField[0]) {
            inputErrorField.find("#" + (element.attr('id'))).detach();
            inputErrorField.replaceWith(element);
            label.detach();
            return labelErrorField.replaceWith(label);
          }
        }