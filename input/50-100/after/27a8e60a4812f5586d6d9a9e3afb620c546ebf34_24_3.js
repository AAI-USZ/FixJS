function testMustAuthUserEvent(event_name, message) {
    createController("waitForUserValidation", event_name);
    register(event_name, function(msg, info) {
      equal(info.mustAuth, true, "user needs to verify");
      start();
    });
    controller.startCheck();
  }