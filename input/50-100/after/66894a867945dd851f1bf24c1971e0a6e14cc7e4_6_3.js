function() {
    storage.setReturnTo(testOrigin);
    xhr.setContextInfo("auth_level", "password");

    xhr.useResult("complete");
    lib.waitForEmailValidation("registered@testuser.com", function(status) {
      ok(!storage.getReturnTo(), "staged on behalf of is cleared when validation completes");
      testHelpers.testEmailMarkedVerified("registered@testuser.com");
      equal(status, "complete", "complete response expected");
      start();
    }, testHelpers.unexpectedXHRFailure);
  }