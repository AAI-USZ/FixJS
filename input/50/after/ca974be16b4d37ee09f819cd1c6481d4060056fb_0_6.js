function(code, set) {
      var loc = getLocalization(code, set);
      if(loc) CurrentLocalization = loc;
      return loc;
    }