function() {
  "use strict";

  var bid = BrowserID,
      controller,
      el,
      testHelpers = bid.TestHelpers,
      mediator = bid.Mediator,
      user = bid.User;

  function createController(config, complete) {
    config = config || {};
    config.ready = complete;

    controller = BrowserID.Modules.GenerateAssertion.create();
    controller.start(config);
  }

  module("dialog/js/modules/email_chosen", {
    setup: function() {
      testHelpers.setup();
    },

    teardown: function() {
      if(controller) {
        controller.destroy();
      }
      testHelpers.teardown();
    }
  });

  asyncTest("start with email, expect an assertion to be generated", function() {
    user.syncEmailKeypair("testuser@testuser.com", function() {
      createController( { email: "testuser@testuser.com" }, function(assertion) {
        ok(assertion, "assertion generated");
        start();
      });
    });
  });

}