function() {
    errorCB = expectedError;

    xhr.useResult("ajaxError");
    dialogHelpers.authenticateUser.call(controllerMock, "testuser@testuser.com", "password", testHelpers.unexpectedSuccess);
  }