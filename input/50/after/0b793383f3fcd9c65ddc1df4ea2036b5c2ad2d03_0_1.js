function() {
    var flag = validate_checkout();
    confirm_checkinout(flag);
    return false;
  }