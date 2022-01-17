function() {
    bid.manageAccount(mocks, function() {
      $("#old_password").val("oldpassword");
      $("#new_password").val("newpassword");

      bid.manageAccount.changePassword(function(status) {
        equal(status, true, "on proper completion, status is true");
        equal(tooltip.shown, false, "on proper completion, tooltip is not shown");

        equal($("#old_password").val(), "", "old_password field is cleared");
        equal($("#new_password").val(), "", "new_password field is cleared");

        start();
      });
    });
  }