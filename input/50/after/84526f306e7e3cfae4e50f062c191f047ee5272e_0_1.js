function(jqXHR) {
            if (errorHandler !== null) {
              errorHandler.handleError(jqXHR.responseText, jqXHR.status);
            } else {
              // TODO: nice messages for user input related failures.
              $('body').html(jqXHR.responseText);
            }
          }