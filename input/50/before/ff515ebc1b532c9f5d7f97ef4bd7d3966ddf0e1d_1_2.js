function(status) {
        equal(status, false, "on missing new password, status is false");
        testHelpers.testTooltipVisible();
        start();
      }