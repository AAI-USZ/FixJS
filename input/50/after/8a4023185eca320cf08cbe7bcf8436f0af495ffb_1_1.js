function getCsrfToken(nextCallback, errorHandlerArg) {
      ajaxCommon('POST', '/auth/api/csrftoken/', null, null,
                 function(result) {
                   csrfToken = result.csrfToken;
                   nextCallback();
                 }, errorHandlerArg);
    }