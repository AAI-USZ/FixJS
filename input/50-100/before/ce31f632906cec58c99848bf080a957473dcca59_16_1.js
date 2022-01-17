function() {
    xhr.useResult("invalid");
    lib.authenticate(TEST_EMAIL, "testuser", function onComplete(authenticated) {
      equal(false, authenticated, "invalid authentication.");
      start();
    }, testHelpers.unexpectedXHRFailure);
  }