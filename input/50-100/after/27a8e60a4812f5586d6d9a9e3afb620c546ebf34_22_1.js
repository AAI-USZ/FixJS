function() {
    var tooLong = testHelpers.generateString(bid.PASSWORD_MAX_LENGTH + 1);
    var valid = validation.passwordAndValidationPassword(tooLong, tooLong);

    equal(valid, false, "too long password is invalid");
    equal(tooltipShown, true, "too long password shows tooltip");
  }