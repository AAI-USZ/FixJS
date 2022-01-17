function Stub() {
    var csrfToken = null, errorHandler = null, that = this;

    /**
     * Helper private function, in addition to all arguments accepted
     * by a public ajax() function, takes dictionary of headers to be
     * sent along with the request.
     */
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

    /**
     * Private function that retrieves csrf protection token and
     * invokes a callback on success.
     */
    function getCsrfToken(nextCallback) {
      ajaxCommon('POST', '/auth/api/csrftoken/', null, null,
                 function(result) {
                   csrfToken = result.csrfToken;
                   nextCallback();
                 });
    }

    /**
      * Invokes a given HTTP method (a string) on a given resource (a
      * string), passing to it parameters (an object that the function
      * serializes to json and that can be null). When successfully
      * done, invokes a successCallback. On failure, if an error
      * handler is set, invokes it and passes error message along with
      * HTTP error code.
      */
    this.ajax = function(method, resource, params, successCallback) {
      if (csrfToken === null) {
        // Each HTTP method call, except the one that returns a csrf
        // protection token needs to carry the token. Get the token
        // and reexecute the call.
        getCsrfToken(function() {
          that.ajax(method, resource, params, successCallback);
        });
        return;
      }
      ajaxCommon(method, resource, params, {'X-CSRFToken' : csrfToken},
                 successCallback);
    };

    /**
     * Sets an error handler that will be invoked when ajax call fails.
     */
    this.setErrorHandler = function(handler) {
      errorHandler = handler;
    };
  }