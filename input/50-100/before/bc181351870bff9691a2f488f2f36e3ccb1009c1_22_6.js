function() {
    mediator.publish("start", {
      hostname: "http://example.com",
      privacyURL: "http://example.com/priv.html",
      tosURL: "http://example.com/tos.html"
    });
    mediator.publish("assertion_generated", { assertion: null });

    equal(actions.called.doPickEmail, true, "doPickEmail callled");
    equal(actions.info.doPickEmail.origin, "http://example.com", "hostname preserved");
    equal(actions.info.doPickEmail.privacyURL, "http://example.com/priv.html", "privacyURL preserved");
    equal(actions.info.doPickEmail.tosURL, "http://example.com/tos.html", "tosURL preserved");
  }