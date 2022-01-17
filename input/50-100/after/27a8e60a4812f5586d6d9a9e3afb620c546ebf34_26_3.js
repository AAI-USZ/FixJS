function() {
    xhr.setContextInfo("auth_level", "assertion");
    xhr.useResult("incorrectPassword");

    testPasswordChangeFailure("oldpassword", "newpassword", "incorrect old password, expected failure");
  }