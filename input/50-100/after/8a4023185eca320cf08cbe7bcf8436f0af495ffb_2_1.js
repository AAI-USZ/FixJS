function executeIfLoggedOut(callback) {
    // Whoami succeeds only for authenticated users.
    stub.ajax('GET', '/auth/api/whoami/', null,
              function() {
                // Logged in, go to the logout page.
                window.location = '/auth/logout';
              },
              function(errorMessage, errorStatus) {
                if (errorStatus === 401) {
                  // Logget out.
                  callback();
                } else {
                  // Other error.
                  $('body').html(errorMessage);
                }
              });
  }