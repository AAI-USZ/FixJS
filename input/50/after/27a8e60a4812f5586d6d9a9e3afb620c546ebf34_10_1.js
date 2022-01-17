function passwordLength(password) {
    var valid = password && (password.length >= bid.PASSWORD_MIN_LENGTH && password.length <= bid.PASSWORD_MAX_LENGTH);

    if(!valid) {
      tooltip.showTooltip("#password_length");
    }

    return valid;
  }