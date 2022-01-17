function() {
    var tooShort = testHelpers.generateString(bid.PASSWORD_MIN_LENGTH - 1);
    var valid = validation.passwordAndValidationPassword(tooShort, tooShort);

    equal(valid, false, "too short password is invalid");
    equal(tooltipShown, true, "too short password shows tooltip");
  }