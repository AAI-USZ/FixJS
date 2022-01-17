function() {
    xhr.useResult("mustAuth");
    createController("waitForUserValidation");
    register("authenticate", function(msg, info) {
      // we want the email, type and known all sent back to the caller so that
      // this information does not need to be queried again.
      equal(info.email, "registered@testuser.com", "correct email");
      ok(info.type, "type sent with info");
      ok(info.known, "email is known");
      start();
    });
    controller.startCheck();
  }