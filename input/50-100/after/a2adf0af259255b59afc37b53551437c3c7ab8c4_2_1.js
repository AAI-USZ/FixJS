function() {
          var confirmationElement = $(this),
              element = form.find('#' + this.id.match(/(.+)_confirmation/)[1] + '[data-validate]:input');

          if (element[0]) {
            $('#' + confirmationElement.attr('id'))
              .live('focusout', function() {
                element.data('changed', true).isValid(settings.validators);
              })
              // .live('keyup', function() {
              //   element.data('changed', true).isValid(settings.validators);
              // })
          }
        }