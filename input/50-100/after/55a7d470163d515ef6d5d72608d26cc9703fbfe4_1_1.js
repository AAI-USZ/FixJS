function getLocalization(localeCode, fallback) {
    var loc, set;
    if(!isString(localeCode)) localeCode = '';
    loc = Localizations[localeCode] || Localizations[localeCode.slice(0,2)];
    if(!loc && (set = getCommonLocalization(localeCode))) {
      return setLocalization(localeCode, set);
    }
    if(fallback === false && !loc) {
      throw new Error('Invalid locale.');
    }
    return loc || CurrentLocalization;
  }