function startup() {
  // Set the time zone to UTC.
  var env = Components.classes["@mozilla.org/process/environment;1"]
                            .getService(Components.interfaces.nsIEnvironment);
  env.set('TZ', 'UTC');

  var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("mailnews.");
  prefs.setIntPref("reply_header_type", 1);
  prefs.setCharPref("reply_header_authorwrote", "%s");

  var myPanel = document.getElementById("my-panel");
  myPanel.label = "Tor Enabled";
  myPanel.style.color = "green";
}