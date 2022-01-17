function() {
    mediator.publish("start", { privacyPolicy: "priv.html", termsOfService: "tos.html" });
    mediator.publish("authenticate", { email: TEST_EMAIL });

    testActionStarted("doAuthenticate", { email: TEST_EMAIL, siteTOSPP: true });
  }