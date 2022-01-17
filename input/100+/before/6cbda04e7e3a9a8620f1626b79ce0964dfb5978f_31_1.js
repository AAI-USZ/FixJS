function() {
  "use strict";

  var bid = BrowserID,
      testHelpers = bid.TestHelpers,
      controller;

  module("pages/about", {
    setup: function() {
      testHelpers.setup();
      bid.Renderer.render("#page_head", "site/about", {});
    },
    teardown: function() {
      testHelpers.teardown();
    }
  });

  function createController(options, callback) {
    controller = BrowserID.about.create();
    controller.start(options);
  }

  test("start - no errors", function() {
    createController({});
    ok(controller, "controller created");
  });

}