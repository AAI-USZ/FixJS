function startup() {
  // Set the time zone to UTC.
  var env = Components.classes["@mozilla.org/process/environment;1"]
                            .getService(Components.interfaces.nsIEnvironment);
  env.set('TZ', 'UTC');

  var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefBranch);
  prefs.setIntPref("mailnews.reply_header_type", 1);
  prefs.setCharPref("mailnews.reply_header_authorwrote", "%s");

  var myPanel = document.getElementById("my-panel");
  if (prefs.getBoolPref("extensions.torbirdy.protected"))
  {
    if (prefs.getIntPref("extensions.torbirdy.proxy") == 0) 
    {
      myPanel.label = "TorBirdy Enabled:   Tor";
      myPanel.style.color = "green";
    } else {
      myPanel.label = "TorBirdy Enabled: JonDo";
      myPanel.style.color = "green";
    }
  } else {
      myPanel.label = "TorBirdy:     Disabled!";
    myPanel.style.color = "red";
  }
}