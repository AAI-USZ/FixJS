function() {
    xhr.useResult("mustAuth");
    createController("waitForUserValidation");
    register("authenticate", function(msg, info) {
      equal(info.email, "registered@testuser.com", "correct email");
      ok(info.type, "type sent with info");
      ok(info.known, "email is known");
      start();
    });
    controller.startCheck();

    testVerifiedUserEvent("authenticate", "User Must Auth");
  }