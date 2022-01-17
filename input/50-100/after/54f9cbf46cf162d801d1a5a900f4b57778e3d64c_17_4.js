function() {
    mediator.publish("start", { privacyURL: "priv.html", tosURL: "tos.html" });
    mediator.publish("authenticate", { email: TEST_EMAIL });

    testActionStarted("doAuthenticate", { email: TEST_EMAIL, siteTOSPP: true });
  }