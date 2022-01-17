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

  module("shared/modules/xhr_disable_form", {
    setup: function() {
      testHelpers.setup();
      createModule();
    },

    teardown: function() {
      testHelpers.teardown();
    }
  });

  test("xhr_start adds 'submit_disabled' to class, xhr_complete removes it", function() {
    var body = $("body");

    mediator.publish("xhr_start");
    equal(body.hasClass("submit_disabled"), true, "xhr_start adds submit_disabled");

    mediator.publish("xhr_complete");
    equal(body.hasClass("submit_disabled"), false, "xhr_complete removes submit_disabled");
  });
}