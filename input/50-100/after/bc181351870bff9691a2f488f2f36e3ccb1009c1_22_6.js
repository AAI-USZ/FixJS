function() {
    mediator.publish("start", {
      hostname: "http://example.com",
      privacyPolicy: "http://example.com/priv.html",
      termsOfService: "http://example.com/tos.html"
    });
    mediator.publish("assertion_generated", { assertion: null });

    equal(actions.called.doPickEmail, true, "doPickEmail callled");
    equal(actions.info.doPickEmail.origin, "http://example.com", "hostname preserved");
    equal(actions.info.doPickEmail.siteTOSPP, true, "siteTOSPP preserved");
  }