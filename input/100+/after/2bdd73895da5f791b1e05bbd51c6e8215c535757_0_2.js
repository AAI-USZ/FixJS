function() {
        if (!$(this).data('validate')) return;
        numValidatedFields++;
        var validations = $(this).data('validate').replace(/\s/g, '').split(',');
        var showErrors = options.immediateValidation;

        var validateField = function() {
          var val = $(this).val();
          var errors = [];
          for (var i=0; i < validations.length; i++) {
            var validation = validations[i];
            var res = options.validators[validation].call(this, val);
            if (res == false || typeof res === 'string') { // Error or error message returned
              errors.push(res || "This field has an error");
            }
          }

          if (errors.length > 0 && showErrors) {
            $(this).addClass(options.errorClass);
            $(this).removeClass(options.validClass);
            if (typeof options.onError === 'function') options.onError.call(this, errors);
          } else if (errors.length === 0) {
            showErrors = true;
            $(this).addClass(options.validClass);
            $(this).removeClass(options.errorClass);
            if (typeof options.onValid === 'function') options.onValid.call(this);
          }

          if (options.disableSubmit) {
            if ($form.find("." + options.validClass).length == numValidatedFields) {
              $form.find(':submit').removeAttr('disabled');
            } else {
              $form.find(':submit').attr('disabled', 'true');
            }
          }
        };

        if (!options.immediateValidation) $(this).blur(function() { showErrors = true; });
        if (options.validateOnBlur) $(this).blur(validateField);
        if (options.validateOnKeyUp) $(this).keyup(validateField);

        if ($form.data("validate-on-load") === true) {
          validateField.call(this);
        }
      }