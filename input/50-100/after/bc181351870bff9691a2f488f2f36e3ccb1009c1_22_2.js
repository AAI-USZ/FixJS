function() {
    mediator.publish("start", { privacyPolicy: "priv.html", termsOfService: "tos.html" });
    mediator.publish("forgot_password", {
      email: TEST_EMAIL,
      requiredEmail: true
    });
    testActionStarted("doForgotPassword", { email: TEST_EMAIL, requiredEmail: true });
  }