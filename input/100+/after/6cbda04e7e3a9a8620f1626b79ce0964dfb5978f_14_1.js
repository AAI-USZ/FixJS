function() {
  "use strict";

  var bid = BrowserID,
      tooltip = bid.Tooltip

  module("common/js/tooltip", {
    setup: function() {
    },
    teardown: function() {
    }
  });


  asyncTest("show short tooltip, min of 2.5 seconds", function() {
    var startTime = new Date().getTime();

    tooltip.showTooltip("#shortTooltip", function() {
      var endTime = new Date().getTime();
      var diff = endTime - startTime;
      ok(2000 <= diff && diff <= 3000, diff + " - minimum of 2 seconds, max of 3 seconds");

      equal(tooltip.shown, false, "tooltip says it is no longer shown");

      start();
    });

    equal(tooltip.shown, true, "tooltip says that it is shown");
  });

  asyncTest("show long tooltip, takes about 5 seconds", function() {
    var startTime = new Date().getTime();

    tooltip.showTooltip("#longTooltip", function() {
      var endTime = new Date().getTime();
      var diff = endTime - startTime;
      ok(diff >= 4500, diff + " - longer tooltip is on the screen for a bit longer");

      start();
    });
  });

  asyncTest("show tooltip, then reset - hides tooltip, resets shown status", function() {
    tooltip.showTooltip("#shortTooltip");
    setTimeout(function() {
      tooltip.reset();

      equal($(".tooltip:visible").length, 0, "after reset, all tooltips are hidden");
      equal(tooltip.shown, false, "after reset, tooltip status is reset");
      start();
    }, 100);
  });

}