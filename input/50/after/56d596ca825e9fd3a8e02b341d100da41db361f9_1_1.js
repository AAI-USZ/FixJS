function() {
    testPasswordChangeFailure(generateString(bid.PASSWORD_MAX_LENGTH + 1), "newpassword", "missing old password, expected failure");
  }