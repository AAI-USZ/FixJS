function(email) {
    if (email) {
      for (var domain in config.ALLOWED_DOMAINS) {
        var canidate = config.ALLOWED_DOMAINS[domain];
        canidate = canidate.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

        if (email.match("^.*@" + canidate + "$")) {
          return true;
        }
      }
    }
    return false;
  }