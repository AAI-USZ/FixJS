function() {
    var body = $("body");

    mediator.publish("xhr_start");
    equal(body.hasClass("submit_disabled"), true, "xhr_start adds submit_disabled");

    mediator.publish("xhr_complete");
    equal(body.hasClass("submit_disabled"), false, "xhr_complete removes submit_disabled");
  }