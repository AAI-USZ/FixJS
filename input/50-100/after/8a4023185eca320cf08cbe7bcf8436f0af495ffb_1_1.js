function(jqXHR) {
          if (typeof errorHandlerArg !== 'undefined') {
            errorHandlerArg(jqXHR.responseText, jqXHR.status);
          } else if (errorHandler !== null) {
            errorHandler(jqXHR.responseText, jqXHR.status);
          } else {
            // No error handler. Fatal error:
            $('html').html(jqXHR.responseText);
          }
        }