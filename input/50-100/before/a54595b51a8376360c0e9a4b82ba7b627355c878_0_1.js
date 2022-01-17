function(req) {
    switch (req.method.toLowerCase()) {
      case "get":
      case "head":
      case "del":
        return true;
      case "post":
      case "put":
        return false;
      default:
        throw new Error("I don't support HTTP " + req.method + " method yet!");
    }
  }