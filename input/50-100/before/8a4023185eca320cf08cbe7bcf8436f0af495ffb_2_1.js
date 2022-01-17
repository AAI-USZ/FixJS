function executeIfLoggedOut(callback) {
    stub.setErrorHandler({
      cleanError: function() {},

      handleError: function(message, status) {
        if (status === 401) {
          // Logget out.
          callback();
        } else {
          // Other error.
          $('body').html(message);
        }
      }
    });

    // Whoami succeeds only for authenticated users.
    stub.ajax('GET', '/auth/api/whoami/', null,
              function() {
                // Logged in, go to the logout page.
                window.location = '/auth/logout';
              });
  }