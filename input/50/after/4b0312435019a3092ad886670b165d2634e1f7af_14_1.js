function(command) {
    return error("" + (missing("Command " + command)) + "\n\nTry `neat help` for a list of the available commands.");
  }