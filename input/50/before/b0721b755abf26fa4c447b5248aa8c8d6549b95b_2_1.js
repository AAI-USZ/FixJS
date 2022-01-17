function checkPassword(pass) {
  if (!pass || pass.length < 8 || pass.length > 80) {
    return "valid passwords are between 8 and 80 chars";
  }
}