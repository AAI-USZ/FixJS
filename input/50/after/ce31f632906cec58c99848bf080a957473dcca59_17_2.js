function() {
    expectedMessage("password_submit");
    expectedMessage("authentication_success");
    dialogHelpers.authenticateUser.call(controllerMock, "testuser@testuser.com", "password", function(authenticated) {
      equal(authenticated, true, "user is authenticated");
      start();
    });
  }