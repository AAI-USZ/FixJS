function() {
    var LOGGED_IN_EMAIL = TEST_EMAIL;
    xhr.setContextInfo("auth_level", "password");

    lib.syncEmailKeypair(LOGGED_IN_EMAIL, function() {
      storage.setLoggedIn(lib.getOrigin(), LOGGED_IN_EMAIL);
      lib.getSilentAssertion(LOGGED_IN_EMAIL, function(email, assertion) {
        equal(email, LOGGED_IN_EMAIL, "correct email");
        strictEqual(assertion, null, "correct assertion");
        start();
      }, testHelpers.unexpectedXHRFailure);
    }, testHelpers.unexpectedXHRFailure);
  }