function() {
    storage.setReturnTo(testOrigin);

    xhr.useResult("complete");
    lib.waitForEmailValidation("registered@testuser.com", function(status) {
      ok(!storage.getReturnTo(), "staged on behalf of is cleared when validation completes");
      equal(status, "complete", "complete response expected");
      start();
    }, testHelpers.unexpectedXHRFailure);
  }