function() {
    xhr.setContextInfo("auth_level", "password");
    xhr.useResult("incorrectPassword");
    testPasswordChangeFailure("incorrectpassword", "newpassword", "incorrect old password, expected failure");
  }