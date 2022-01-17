function getLocalization(localeCode, skipFallback, set) {
    var loc;
    if(!localeCode || !isString(localeCode)) return CurrentLocalization;
    loc = Localizations[localeCode] || Localizations[localeCode.slice(0,2)];
    if(!loc || set)  loc = setLocalization(localeCode, set, skipFallback);
    return loc;
  }