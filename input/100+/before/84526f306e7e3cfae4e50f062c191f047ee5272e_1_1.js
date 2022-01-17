function login(assertion) {
    if (assertion) {
      stub.setErrorHandler({
        cleanError: function() {},

        handleError: function(message, status) {
          if (status === 403) {
            // Login failed because the user is unknown.
            $('#sign-in').addClass('hidden');
            $('#nothing-shared').removeClass('hidden');
          } else {
            // Other error.
            $('body').html(message);
          }
        }
      });

      stub.ajax('POST', '/auth/api/login/',
                { 'assertion' : assertion.toString() },
                function() {
                  window.location.reload(true);
                });
    } else {
      alert('BrowserID assertion not set');
    }
  }