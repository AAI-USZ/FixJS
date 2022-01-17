function() {
    mediator.publish("start", { privacyPolicy: "priv.html", termsOfService: "tos.html" });
    mediator.publish("add_email");
    testActionStarted("doAddEmail");
  }