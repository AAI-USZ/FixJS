function() {
    expectedMessage("reset_password_staged", {
      email: "registered@testuser.com"
    });

    dialogHelpers.resetPassword.call(controllerMock, "registered@testuser.com", "password", function(reset) {
      ok(reset, "password reset");
      start();
    });
  }