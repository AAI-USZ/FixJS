function(method, resource, params, successCallback,
                         errorHandlerArg) {
      if (csrfToken === null) {
        // Each HTTP method call, except the one that returns a csrf
        // protection token needs to carry the token. Get the token
        // and reexecute the call.
        getCsrfToken(function() {
          that.ajax(method, resource, params, successCallback, errorHandlerArg);
        }, errorHandlerArg);
        return;
      }
      ajaxCommon(method, resource, params, {'X-CSRFToken' : csrfToken},
                 successCallback, errorHandlerArg);
    }