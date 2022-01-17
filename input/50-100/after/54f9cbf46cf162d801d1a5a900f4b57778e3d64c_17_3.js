function() {
    mediator.publish("start", { privacyURL: "priv.html", tosURL: "tos.html" });
    mediator.publish("forgot_password", {
      email: TEST_EMAIL,
      requiredEmail: true
    });
    testActionStarted("doForgotPassword", { email: TEST_EMAIL, requiredEmail: true, siteTOSPP: true });
  }