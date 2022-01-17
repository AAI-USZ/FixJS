function() {
    var appInfo = Components.classes["@mozilla.org/xre/app-info;1"]
        .getService(Components.interfaces.nsIXULAppInfo);

    // Mozilla updates (doing this for all applications, not just individual
    // applications from the Mozilla community that I'm aware of).
    // At least the http url is needed for Firefox updates, adding the https
    // one as well to be safe.
    this._compatibilityRules.push(["http://download.mozilla.org/", null,
        appInfo.vendor]);
    this._compatibilityRules.push(["https://download.mozilla.org/", null,
        appInfo.vendor]);
    // There are redirects from 'addons' to 'releases' when installing addons
    // from AMO. Adding the origin of 'releases' to be safe in case those
    // start redirecting elsewhere at some point.
    this._compatibilityRules.push(["http://addons.mozilla.org/", null,
        appInfo.vendor]);
    this._compatibilityRules.push(["https://addons.mozilla.org/", null,
        appInfo.vendor]);
    this._compatibilityRules.push(["http://releases.mozilla.org/", null,
        appInfo.vendor]);
    this._compatibilityRules.push(["https://releases.mozilla.org/", null,
        appInfo.vendor]);
    // Firefox 4 has the about:addons page open an iframe to the mozilla site.
    // That opened page grabs content from other mozilla domains.
    this._compatibilityRules.push(["about:addons",
        "https://services.addons.mozilla.org/", appInfo.vendor]);
    this._compatibilityRules.push(["https://services.addons.mozilla.org/",
        "https://static.addons.mozilla.net/", appInfo.vendor]);
    this._compatibilityRules.push(["https://services.addons.mozilla.org/",
        "https://addons.mozilla.org/", appInfo.vendor]);
    this._compatibilityRules.push(["https://services.addons.mozilla.org/",
        "https://www.mozilla.com/", appInfo.vendor]);
    this._compatibilityRules.push(["https://services.addons.mozilla.org/",
        "https://www.getpersonas.com/", appInfo.vendor]);
    this._compatibilityRules.push(["https://services.addons.mozilla.org/",
        "https://static-cdn.addons.mozilla.net/", appInfo.vendor]);
    // Firefox 4 uses an about:home page that is locally stored but can be
    // the origin for remote requests. See bug #140 for more info.
    this._compatibilityRules.push(["about:home", null, appInfo.vendor]);
    // Firefox Sync uses a google captcha.
    this._compatibilityRules.push(["https://auth.services.mozilla.com/",
        "https://api-secure.recaptcha.net/challenge?", appInfo.vendor]);
    this._compatibilityRules.push([
        "https://api-secure.recaptcha.net/challenge?",
        "https://www.google.com/recaptcha/api/challenge?", appInfo.vendor]);
    this._compatibilityRules.push(["https://auth.services.mozilla.com/",
        "https://www.google.com/recaptcha/api/", appInfo.vendor]);

    // Flock
    if (appInfo.ID == "{a463f10c-3994-11da-9945-000d60ca027b}") {
      requestpolicy.mod.Logger.info(requestpolicy.mod.Logger.TYPE_INTERNAL,
          "Application detected: " + appInfo.vendor);
      this._compatibilityRules.push(["about:myworld", "http://www.flock.com/",
          appInfo.vendor]);
      this._compatibilityRules.push(["about:flock", null, appInfo.vendor]);
      this._compatibilityRules.push(["http://www.flock.com/rss",
          "http://feeds.feedburner.com/flock", appInfo.vendor]);
      this._compatibilityRules.push(["http://feeds.feedburner.com/",
          "http://www.flock.com/", appInfo.vendor]);
    }

    // Seamonkey
    if (appInfo.ID == "{92650c4d-4b8e-4d2a-b7eb-24ecf4f6b63a}") {
      requestpolicy.mod.Logger.info(requestpolicy.mod.Logger.TYPE_INTERNAL,
          "Application detected: Seamonkey");
      this._compatibilityRules.push(["mailbox:", null, "Seamonkey"]);
      this._compatibilityRules.push([null, "mailbox:", "Seamonkey"]);
    }
  }