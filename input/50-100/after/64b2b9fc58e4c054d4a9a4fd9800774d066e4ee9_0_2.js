function isLocationBlocked(location) {
  var siteList = PREFS.whitelist ? PREFS.domainWhitelist : PREFS.domainBlacklist;
  for(var k in siteList) {
    listedPattern = parseLocation(siteList[k]);
    if(locationsMatch(location, listedPattern)) {
      // If we're in a whitelist, a matched location is not blocked => false
      // If we're in a blacklist, a matched location is blocked => true
      return !PREFS.whitelist;
    }
  }
  
  // If we're in a whitelist, an unmatched location is blocked => true
  // If we're in a blacklist, an unmatched location is not blocked => false
  return PREFS.whitelist;
}