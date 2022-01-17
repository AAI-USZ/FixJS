function testVerifiedUserEvent(event_name, message, password) {
    createController("waitForUserValidation", event_name, false, password);
    register(event_name, function(msg, info) {
      equal(info.mustAuth, false, "user does not need to verify");
      start();
    });
    controller.startCheck();
  }