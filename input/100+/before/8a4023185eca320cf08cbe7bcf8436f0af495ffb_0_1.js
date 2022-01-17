function(successCallback) {
      stub.setErrorHandler({
        cleanError: function() {},
        handleError: function(message, status) {
          if (status === 401) {
            that.errorHandler.handleError(
              'wwwhisper misconfigured: Admin application can ' +
                'be accessed without authentication!');
            stub.setErrorHandler(that.errorHandler);
            successCallback();
          } else {
            // Other error.
            $('body').html(message);
          }
        }
      });

      stub.ajax('GET', '/auth/api/whoami/', null, function(result) {
        that.adminUserEmail = result.email;
        stub.setErrorHandler(that.errorHandler);
        successCallback();
      });
    }