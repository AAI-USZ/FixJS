function() {
    var tooLong = "";
    for(var i = 0; i < 81; i++) {
      tooLong += (i % 10);
    }
    var valid = validation.passwordAndValidationPassword(tooLong, tooLong);

    equal(valid, false, "too short password is invalid");
    equal(tooltipShown, true, "too short password shows tooltip");
  }