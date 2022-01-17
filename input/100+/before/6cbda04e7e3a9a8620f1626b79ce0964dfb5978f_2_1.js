function() {
  "use strict";

  var bid = BrowserID,
      testHelpers = bid.TestHelpers,
      Command = bid.Command;

  module("shared/command", {
    setup: function() {
      testHelpers.setup();
    },

    teardown: function() {
      testHelpers.teardown();
    }
  });

  asyncTest("run - run_options passed to callback", function() {
    var cmd = Command.create({
      callback: function(options) {
        equal(options.item, "value", "correct options sent");
        start();
      },
      run_options: {
        item: "value"
      }
    });

    cmd.run();
  });

  asyncTest("extendRunOptions, run - run_options extended, passed to callback", function() {
    var cmd = Command.create({
      callback: function(options) {
        equal(options.item, "value", "correct options sent");
        start();
      }
    });

    cmd.extendRunOptions({ item: "value" });
    cmd.run();
  });
}