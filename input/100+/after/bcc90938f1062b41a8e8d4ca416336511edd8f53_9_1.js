function setPermission(url, permission)
{
  let uri = Components.classes["@mozilla.org/network/io-service;1"]
                      .getService(Components.interfaces.nsIIOService)
                      .newURI(url, null, null);
  Components.classes["@mozilla.org/permissionmanager;1"]
            .getService(Components.interfaces.nsIPermissionManager)
            .add(uri, permission,
                 Components.interfaces.nsIPermissionManager.ALLOW_ACTION);
}