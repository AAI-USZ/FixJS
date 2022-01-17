function passwordLength(password) {
    var valid = password && (password.length >= 8 && password.length <= 80);

    if(!valid) {
      tooltip.showTooltip("#password_length");
    }

    return valid;
  }