function testPasswordChangeSuccess(oldPass, newPass, msg) {
    testPasswordChange(oldPass, newPass, function(status) {
      equal(status, true, msg);
      // if success is expected, both password fields should be visible.
      equal($("#old_password").val(), "", "old_password field is cleared");
      equal($("#new_password").val(), "", "new_password field is cleared");
      testHelpers.testTooltipNotVisible();
      network.checkAuth(function(authLevel) {
        equal(authLevel, "password", "after password change, user authenticated to password level");
        start();
      }, testHelpers.unexpectedXHRFailure);
    }, msg);
  }