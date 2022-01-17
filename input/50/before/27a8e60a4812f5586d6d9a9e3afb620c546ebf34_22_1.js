function() {
    var valid = validation.passwordAndValidationPassword("pass", "password");

    equal(valid, false, "too short password is invalid");
    equal(tooltipShown, true, "too short password shows tooltip");
  }