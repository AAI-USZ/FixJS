function testAuthenticateSpecifiedEmail(specified, expected) {
    var options = {
      email: TEST_EMAIL,
      complete: function() {
        testActionStarted("doAuthenticateWithRequiredEmail", {
          cancelable: expected
        });
        start();
      }
    };

    if (typeof specified !== "undefined") options.cancelable = specified;

    mediator.publish("authenticate_specified_email", options);
  }