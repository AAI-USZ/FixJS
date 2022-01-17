function() {
  "use strict";

  var controller,
      el = $("body"),
      bid = BrowserID,
      user = bid.User,
      network = bid.Network,
      xhr = bid.Mocks.xhr,
      modules = bid.Modules,
      testHelpers = bid.TestHelpers,
      register = testHelpers.register;


  module("dialog/js/modules/is_this_your_computer", {
    setup: function() {
      testHelpers.setup();
    },

    teardown: function() {
      if (controller) {
        try {
          controller.destroy();
          controller = null;
        } catch(e) {
          // could already be destroyed from the close
        }
      }
      testHelpers.teardown();
    }
  });

  function createController(options) {
    controller = modules.IsThisYourComputer.create();
    controller.start(options || {});
  }

  asyncTest("yes - sets ownership flag to true for the user", function() {
    createController();
    network.authenticate("testuser@testuser.com", "password", function() {
      register("user_computer_status_set", function(msg, data) {
        equal(data.users_computer, true, "user_computer_status_set called with correct status");
        start();
      });
      controller.yes();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("no - set the ownership flag to false for the user", function() {
    createController();
    network.authenticate("testuser@testuser.com", "password", function() {
      register("user_computer_status_set", function(msg, data) {
        equal(data.users_computer, false, "user_computer_status_set called with correct status");
        start();
      });
      controller.no();
    }, testHelpers.unexpectedXHRFailure);
  });
}