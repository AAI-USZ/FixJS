function() {
    var password = testHelpers.generateString(bid.PASSWORD_MIN_LENGTH - 1);
    lib.authenticate(TEST_EMAIL, password, function onComplete(authenticated) {
      equal(false, authenticated, "invalid authentication.");
      start();
    }, testHelpers.unexpectedXHRFailure);
  }