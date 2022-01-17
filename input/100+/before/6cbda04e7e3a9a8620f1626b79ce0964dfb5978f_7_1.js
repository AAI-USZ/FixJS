function() {
  "use strict";

  var bid = BrowserID,
      transport = bid.Mocks.xhr,
      testHelpers = bid.TestHelpers,
      controller;

  function createController(config) {
    controller = BrowserID.Modules.CookieCheck.create();
    controller.start(config);
  }

  module("shared/modules/cookie_check", {
    setup: function() {
      testHelpers.setup();
    },

    teardown: function() {
      testHelpers.teardown();

      controller.destroy();
    }
  });

  asyncTest("create controller with XHR error during cookie check", function() {
    transport.useResult("contextAjaxError");

    createController({
      ready: function() {
        testHelpers.checkNetworkError();
        start();
      }
    });
  });

  asyncTest("create controller with cookies enabled - ready returns with true status", function() {
    transport.setContextInfo("cookies_enabled", true);

    createController({
      ready: function(status) {
        equal(status, true, "cookies are enabled, true status");
        start();
      }
    });
  });

}