function() {
    mediator.publish("authenticate", {
      email: TEST_EMAIL
    });

    equal(actions.info.doAuthenticate.email, TEST_EMAIL, "authenticate with testuser@testuser.com");
  }