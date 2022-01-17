function() {
  var ios = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
  var scriptDir = GM_util.scriptDir();
  scriptDir.normalize();  // in case of symlinks
  return ios.newFileURI(scriptDir).spec;
}