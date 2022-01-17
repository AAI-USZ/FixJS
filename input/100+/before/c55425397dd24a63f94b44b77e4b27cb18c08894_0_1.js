function(aURI) {
    let name = this._getModuleName(aURI);
    if (!(name in this._redirMap))
      throw Components.results.NS_ERROR_ILLEGAL_VALUE;

    let channel = Services.io.newChannel(this._redirMap[name].url, null, null);
    channel.originalURI = aURI;

    if (this._redirMap[name].flags & Ci.nsIAboutModule.URI_SAFE_FOR_UNTRUSTED_CONTENT) {
      let secMan = Cc["@mozilla.org/scriptsecuritymanager;1"]
                     .getService(Ci.nsIScriptSecurityManager);
      let principal = secMan.getCodebasePrincipal(aURI);
      channel.owner = principal;
    }

    return channel;
  }