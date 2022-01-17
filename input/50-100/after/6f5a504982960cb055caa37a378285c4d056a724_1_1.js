function() {
    var body = $("body");

    mediator.publish("xhr_start");
    equal(body.hasClass("submit_disabled"), true, "xhr_start adds submit_disabled");

    // submit_disabled is removed after a small delay so that if consecutive
    // XHR requests happen, there is no button flicker. See issue #1898
    // - https://github.com/mozilla/browserid/issues/1898
    mediator.subscribe("submit_enabled", function() {
      equal(body.hasClass("submit_disabled"), false, "xhr_complete removes submit_disabled");
      start();
    });
    mediator.publish("xhr_complete");
  }