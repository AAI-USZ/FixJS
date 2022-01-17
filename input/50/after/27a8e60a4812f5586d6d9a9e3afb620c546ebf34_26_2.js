function() {
    testPasswordChangeFailure("oldpassword", generateString(bid.PASSWORD_MAN_LENGTH + 1), "too short new password, expected failure");
  }