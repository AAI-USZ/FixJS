function(string) {
    return "'" + string.replace(/\'/g, "'\\''") + "'";
  }