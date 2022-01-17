function(localeCode) {
      return !localeCode ? CurrentLocalization : getLocalization(localeCode, false);
    }