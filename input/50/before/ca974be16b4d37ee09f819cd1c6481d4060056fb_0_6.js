function(code, set) {
      var loc = getLocalization(code, false, set);
      if(loc) {
        Date['currentLocale'] = code;
        checkLocaleFormatsAdded(loc);
        return loc;
      }
    }