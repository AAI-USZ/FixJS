function updatePrefsFormat(prefs) {
  // Sometimes we need to change the format of the PREFS module. When just,
  // say, adding boolean flags with false as the default, there's no
  // compatibility issue. However, in more complicated situations, we need
  // to modify an old PREFS module's structure for compatibility.
  
  if(prefs.hasOwnProperty('siteList')) {
    // Upon adding a separate blacklist and whitelist, the siteList property
    // is renamed to either domainBlacklist or domainWhitelist.
    
    if (prefs.whitelist) {
      prefs.domainBlacklist = defaultPrefs().domainBlacklist;
      prefs.domainWhitelist = prefs.siteList;
    } else {
      prefs.domainBlacklist = prefs.siteList;
      prefs.domainWhitelist = defaultPrefs().domainWhitelist;
    }
    delete prefs.siteList;
    savePrefs(prefs);
    console.log("Renamed PREFS.siteList to PREFS.domain*lists");
  }
  
  if(!prefs.hasOwnProperty('showNotifications')) {
    // Upon adding the option to disable notifications, added the
    // showNotifications property, which defaults to true.
    prefs.showNotifications = true;
    savePrefs(prefs);
    console.log("Added PREFS.showNotifications");
  }
  
  return prefs;
}