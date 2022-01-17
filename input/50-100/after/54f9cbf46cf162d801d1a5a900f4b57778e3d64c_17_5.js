function() {
    mediator.publish("start", { privacyURL: "priv.html", tosURL: "tos.html" });
    mediator.publish("add_email");
    testActionStarted("doAddEmail", { siteTOSPP: true });
  }