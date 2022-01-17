function() {
    var prefs = ["extensions.checkCompatibility",
                 "extensions.checkCompatibility.3.6b",
                 "extensions.checkCompatibility.3.6",
                 "extensions.checkCompatibility.3.6p",
                 "extensions.checkCompatibility.3.6pre",
                 "extensions.checkCompatibility.3.7a",
                 "extensions.checkCompatibility.4.0b",
                 "extensions.checkCompatibility.4.0pre",
                 "extensions.checkCompatibility.4.0p",
                 "extensions.checkCompatibility.4.2a",
                 "extensions.checkCompatibility.4.2a1",
                 "extensions.checkCompatibility.4.2a1pre",
                 "extensions.checkCompatibility.4.2",
                 "extensions.checkCompatibility.4.2b",
                 "extensions.checkCompatibility.5.0",
                 "extensions.checkCompatibility.5.0a",
                 "extensions.checkCompatibility.5.0b",
                 "extensions.checkCompatibility.6.0",
                 "extensions.checkCompatibility.6.0a",
                 "extensions.checkCompatibility.6.0b",
                 "extensions.checkCompatibility.7.0",
                 "extensions.checkCompatibility.7.0a",
                 "extensions.checkCompatibility.7.0b",
                 "extensions.checkCompatibility.nightly"];

    var appInfo = Components.classes["@mozilla.org/xre/app-info;1"]
               .getService(Components.interfaces.nsIXULAppInfo);
    if (appInfo.name == "Thunderbird") {
      prefs = ["extensions.checkCompatibility",
               "extensions.checkCompatibility.3.0",
               "extensions.checkCompatibility.3.1p",
               "extensions.checkCompatibility.3.1pre",
               "extensions.checkCompatibility.3.1a",
               "extensions.checkCompatibility.3.1b",
               "extensions.checkCompatibility.3.1",
               "extensions.checkCompatibility.3.2a",
               "extensions.checkCompatibility.3.3a",
               "extensions.checkCompatibility.7.0a",
               "extensions.checkCompatibility.7.0b",
               "extensions.checkCompatibility.nightly"];
    }
    else if (appInfo.name == "SeaMonkey") {
     prefs = ["extensions.checkCompatibility",
              "extensions.checkCompatibility.2.0",
              "extensions.checkCompatibility.2.1p",
              "extensions.checkCompatibility.2.1pre",
              "extensions.checkCompatibility.2.1a",
              "extensions.checkCompatibility.2.1b",
              "extensions.checkCompatibility.2.1",
              "extensions.checkCompatibility.2.2a",
              "extensions.checkCompatibility.2.2b",
              "extensions.checkCompatibility.2.4a",
              "extensions.checkCompatibility.2.4b",
              "extensions.checkCompatibility.nightly"];
    }
    else if (appInfo.name == "Songbird") {
     prefs = ["extensions.checkCompatibility",
              "extensions.checkCompatibility.1.8",
              "extensions.checkCompatibility.1.9",
              "extensions.checkCompatibility.1.10"];
    }

    var enable = !this.prefService.getBoolPref("nightly.disableCheckCompatibility");
    for(var i = 0; i < prefs.length; i++)
      this.prefService.setBoolPref(prefs[i], enable);
  }