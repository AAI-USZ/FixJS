function(status) {
    switch (status) {
      case "NEW":
        return false;
      case "STUCK":
        return false;
      case "IN_PROGRESS":
        return true;
      case "FIXED":
        return true;
      case "WORKAROUND":
        return false;
      case "IRRELEVANT":
        return true;
    }
    return null;
  }