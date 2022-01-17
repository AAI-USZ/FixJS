function() {
  "use strict";

  var bid = BrowserID,
      Module = bid.Modules.XHRDisableForm,
      testHelpers = bid.TestHelpers,
      mediator = bid.Mediator,
      mod;

  function createModule(options) {
    mod = Module.create({});
    mod.start(options);
    return mod;
  }

  module("common/js/modules/xhr_disable_form", {
    setup: function() {
      testHelpers.setup();
      createModule({ enableDelayMS: 10 });
    },

    teardown: function() {
      testHelpers.teardown();
    }
  });

  asyncTest("xhr_start adds 'submit_disabled' to class, xhr_complete removes it", function() {
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
  });

  asyncTest("multiple xhr_completes only cause one submit_enabled", function() {
    var submitEnabledCount = 0;
    mediator.subscribe("submit_enabled", function() {
      submitEnabledCount++;
    });
    mediator.publish("xhr_complete");
    mediator.publish("xhr_complete");

    // give plenty of time to allow all submit_enabled timeouts to occur.
    setTimeout(function() {
      equal(submitEnabledCount, 1, "submit_enabled called only once");
      start();
    }, 50);
  });

  asyncTest("xhr_start after xhr_complete but before submit_enabled cancels submit_enabled", function() {
    var submitEnabledCount = 0;
    mediator.subscribe("submit_enabled", function() {
      submitEnabledCount++;
    });
    mediator.publish("xhr_complete");
    mediator.publish("xhr_start");

    // give plenty of time to allow all submit_enabled timeouts to occur.
    setTimeout(function() {
      equal(submitEnabledCount, 0, "submit_enabled cancelled after xhr_start");
      start();
    }, 50);
  });

}