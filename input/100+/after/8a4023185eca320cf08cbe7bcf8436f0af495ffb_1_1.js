function ajaxCommon(method, resource, params, headersDict,
                        successCallback, errorHandlerArg) {
      var settings = {
        url: resource,
        type: method,
        headers: headersDict,
        success: successCallback,
        error: function(jqXHR) {
          if (typeof errorHandlerArg !== 'undefined') {
            errorHandlerArg(jqXHR.responseText, jqXHR.status);
          } else if (errorHandler !== null) {
            errorHandler(jqXHR.responseText, jqXHR.status);
          } else {
            // No error handler. Fatal error:
            $('html').html(jqXHR.responseText);
          }
        }
      };
      if (params !== null) {
        settings['data'] = JSON.stringify(params);
        settings['contentType'] = 'application/json; charset=utf-8';
      };
      $.ajax(settings);
    }