function() {
    xhr.useResult("invalid");
    expectedMessage("password_submit");
    expectedMessage("authentication_fail");
    dialogHelpers.authenticateUser.call(controllerMock, "testuser@testuser.com", "password", function(authenticated) {
      equal(authenticated, false, "user is not authenticated");
      start();
    });
  }