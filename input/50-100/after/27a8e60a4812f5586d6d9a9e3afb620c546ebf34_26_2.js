function() {
    testPasswordChangeFailure("oldpassword", generateString(bid.PASSWORD_MIN_LENGTH - 1), "too short new password, expected failure");
  }