function() {
    errorCB = expectedError;

    xhr.useResult("ajaxError");
    expectedMessage("password_submit");
    dialogHelpers.authenticateUser.call(controllerMock, "testuser@testuser.com", "password", testHelpers.unexpectedSuccess);
  }