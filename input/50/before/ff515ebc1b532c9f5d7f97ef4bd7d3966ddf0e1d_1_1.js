function(status) {
        equal(status, false, "on missing old password, status is false");
        testHelpers.testTooltipVisible();
        start();
      }