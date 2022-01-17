function() {
    storage.setReturnTo(testOrigin);

    xhr.setContextInfo("auth_level", false);
    xhr.useResult("complete");

    lib.waitForUserValidation("registered@testuser.com", function(status) {
      equal(status, "mustAuth", "mustAuth response expected");

      testHelpers.testEmailMarkedVerified("registered@testuser.com");

      ok(!storage.getReturnTo(), "staged on behalf of is cleared when validation completes");
      start();
    }, testHelpers.unexpectedXHRFailure);
  }