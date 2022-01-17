function() {
    mediator.publish("start", {
      tosURL: "https://browserid.org/TOS.html",
      privacyURL: "https://browserid.org/priv.html"
    });

    ok(actions.info.doRPInfo.sitename, "doRPInfo called with sitename added and set");
    ok(actions.info.doRPInfo.tosURL, "doRPInfo called with tosURL set");
    ok(actions.info.doRPInfo.privacyURL, "doRPInfo called with privacyURL set");
  }