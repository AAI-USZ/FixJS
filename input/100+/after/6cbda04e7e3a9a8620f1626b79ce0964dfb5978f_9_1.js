function() {
  "use strict";

  var bid = BrowserID,
      Module = bid.Modules.XHRDelay,
      testHelpers = bid.TestHelpers,
      mediator = bid.Mediator,
      screens = bid.Screens,
      mod;

  function createModule(options) {
    mod = Module.create({});
    mod.start(options);
    return mod;
  }

  module("common/js/modules/xhr_delay", {
    setup: function() {
      testHelpers.setup();
      createModule();
    },

    teardown: function() {
      testHelpers.teardown();
    }
  });

  test("xhr_delay shows the delay screen, xhr_complete hides the delay screen", function() {
    mediator.publish("xhr_delay");
    ok($("#slowXHR:visible").length, "slowXHR screen is shown");
    testHelpers.testDelayVisible();

    mediator.publish("xhr_complete");
    equal(testHelpers.delayVisible(), false, "slowXHR screen no longer visible");
  });

  test("xhr_complete does not hide delay screen if delay screen not started by xhr_delay", function() {

    screens.delay.show("wait", {title: "test delay", message: "testing"});

    mediator.publish("xhr_complete");
    testHelpers.testDelayVisible();
  });
}