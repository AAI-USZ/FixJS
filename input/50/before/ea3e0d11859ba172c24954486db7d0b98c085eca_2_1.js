function(str)
  {
    return helpers.escape_input(str).replace(/\r\n/g, "\\n");
  }