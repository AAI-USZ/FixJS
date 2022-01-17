function() {
          var val = $(this).val();
          var errors = [];
          for (var i=0; i < validations.length; i++) {
            var validation = validations[i];
            var res = options.validators[validation].call(this, val);
            if (res == false || typeof res === 'string') { // Error or error message returned
              errors.push(res || "This field has an error");
            }
          }

          if (errors.length > 0) {
            $(this).addClass(options.errorClass);
            $(this).removeClass(options.validClass);
            if (typeof options.onError === 'function') options.onError.call(this, errors);
          } else {
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
        }