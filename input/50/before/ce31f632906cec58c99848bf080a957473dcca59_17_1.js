function() {
    unexpectedMessage("assertion_generated");
    errorCB = expectedError;

    xhr.useResult("ajaxError");
    storage.addEmail("registered@testuser.com", {});
    dialogHelpers.getAssertion.call(controllerMock, "registered@testuser.com", testHelpers.unexpectedSuccess);
  }