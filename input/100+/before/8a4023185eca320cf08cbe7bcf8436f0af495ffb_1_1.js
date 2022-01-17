function ajaxCommon(method, resource, params, headersDict,
                        successCallback) {
      if (errorHandler !== null) {
        errorHandler.cleanError();
      }

      if (params === null) {
        $.ajax({
          url: resource,
          type: method,
          headers: headersDict,
          success: successCallback,
          error: function(jqXHR) {
            if (errorHandler !== null) {
              errorHandler.handleError(jqXHR.responseText, jqXHR.status);
            } else {
              // TODO: nice messages for user input related failures.
              $('body').html(jqXHR.responseText);
            }
          }
        });
      } else {
        $.ajax({
          url: resource,
          type: method,
          data: JSON.stringify(params),
          contentType: 'application/json; charset=utf-8',
          headers: headersDict,
          success: successCallback,
          error: function(jqXHR) {
            if (errorHandler !== null) {
              errorHandler.handleError(jqXHR.responseText, jqXHR.status);
            } else {
              // TODO: nice messages for user input related failures.
              $('body').html(jqXHR.responseText);
            }
          }
        });
      }
    }