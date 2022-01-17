function testVerifiedUserEvent(event_name, message) {
    createController("waitForUserValidation", event_name);
    register(event_name, function() {
      ok(true, message);
      start();
    });
    controller.startCheck();
  }