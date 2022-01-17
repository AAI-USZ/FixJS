function() {
    mediator.publish("user_staged", { email: TEST_EMAIL });

    equal(actions.info.doConfirmUser.email, TEST_EMAIL, "waiting for email confirmation for testuser@testuser.com");
  }