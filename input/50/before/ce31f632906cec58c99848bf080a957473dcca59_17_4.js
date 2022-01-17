function() {
    expectedMessage("password_reset", {
      email: "registered@testuser.com"
    });

    dialogHelpers.resetPassword.call(controllerMock, "registered@testuser.com", "password", function(reset) {
      ok(reset, "password reset");
      start();
    });
  }