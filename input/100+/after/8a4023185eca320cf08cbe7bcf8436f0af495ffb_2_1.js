function login(assertion) {
    if (assertion) {
      stub.ajax('POST', '/auth/api/login/',
                { 'assertion' : assertion.toString() },
                function() {
                  window.location.reload(true);
                },
                function(errorMessage, errorStatus) {
                  if (errorStatus === 403) {
                    // Login failed because the user is unknown.
                    $('#sign-in').addClass('hidden');
                    $('#nothing-shared').removeClass('hidden');
                  } else {
                    // Other error.
                    $('body').html(errorMessage);
                  }
                });
    } else {
      alert('BrowserID assertion not set. Login failed.');
    }
  }