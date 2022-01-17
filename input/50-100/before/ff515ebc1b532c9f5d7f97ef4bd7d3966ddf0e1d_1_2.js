function() {
      $("#old_password").val("oldpassword");
      $("#new_password").val("");

      bid.manageAccount.changePassword(function(status) {
        equal(status, false, "on missing new password, status is false");
        testHelpers.testTooltipVisible();
        start();
      });
    }