function(status) {
          if(status.success) {
            pageHelpers.emailSent("waitForUserValidation", oncomplete && oncomplete.curry(true));
          }
          else {
            tooltip.showTooltip("#could_not_add");
            oncomplete && oncomplete(false);
          }
        }