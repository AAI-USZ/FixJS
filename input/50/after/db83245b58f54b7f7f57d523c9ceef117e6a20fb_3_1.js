function() {
    mediator.publish("reset_password", { email: TEST_EMAIL });
    mediator.publish("user_confirmed");

    equal(actions.info.doEmailConfirmed.email, TEST_EMAIL, "doEmailConfirmed called with correct email");
  }