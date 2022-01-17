function() {
      $("#old_password").val("oldpassword");
      $("#new_password").val("newpassword");
      xhr.useResult("incorrectPassword");

      bid.manageAccount.changePassword(function(status) {
        equal(status, false, "bad password, status is false");
        testHelpers.testTooltipVisible();
        start();
      });
    }