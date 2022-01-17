function() {
    mediator.publish("start", {
      termsOfService: "https://browserid.org/TOS.html",
      privacyPolicy: "https://browserid.org/priv.html"
    });

    ok(actions.info.doRPInfo.termsOfService, "doRPInfo called with termsOfService set");
    ok(actions.info.doRPInfo.privacyPolicy, "doRPInfo called with privacyPolicy set");
  }