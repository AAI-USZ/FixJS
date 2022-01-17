function() {
      $("#old_password").val("");
      $("#new_password").val("newpassword");

      bid.manageAccount.changePassword(function(status) {
        equal(status, false, "on missing old password, status is false");
        testHelpers.testTooltipVisible();
        start();
      });
    }