function () {
  'use strict';
  var stub = new wwwhisper.Stub();

  /**
   * Sends an assertion from a BrowserID sign-in window to the
   * authentication back-end. Reloads the page if login succeeded.
   */
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
      alert('BrowserID assertion not set. Login failed.');
    }
  }

  /**
   * Executes callback if the user is not authenticated, otherwise
   * takes the user to the logout page.
   */
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

  executeIfLoggedOut(function() {
    $('#sign-in').removeClass('hidden');
    $('#browserid').removeClass('hidden');
    $('#nothing-shared').addClass('hidden');
    // Register a callback to process a BrowserID assertion.
    $('#browserid').click(function() {
      navigator.id.get(login);
      return false;
    });
  });

}