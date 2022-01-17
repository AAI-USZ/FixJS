function(successCallback) {
      // Do not use the default error handler, display a more
      // meaningful error message.
      stub.ajax('GET', '/auth/api/whoami/', null,
                function(result) {
                  that.adminUserEmail = result.email;
                  successCallback();
                },
                function(errorMessage, errorStatus) {
                  if (errorStatus === 401) {
                    that.errorHandler(
                      'wwwhisper likely misconfigured: Admin application can ' +
                        'be accessed without authentication!');
                    successCallback();
                  } else {
                    that.errorHandler(errorMessage, errorStatus);
                  }
                });
    }