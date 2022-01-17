function() {
    mediator.publish("forgot_password", {
      email: TEST_EMAIL,
      requiredEmail: true
    });
    equal(actions.info.doForgotPassword.email, TEST_EMAIL, "correct email passed");
    equal(actions.info.doForgotPassword.requiredEmail, true, "correct requiredEmail passed");
  }