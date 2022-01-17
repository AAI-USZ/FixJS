function setPermission(url, permission, value)
{
  const nsIPermissionManager = Components.interfaces.nsIPermissionManager;

  switch (value) {
    case "allow":
      value = nsIPermissionManager.ALLOW_ACTION;
      break;
    case "deny":
      value = nsIPermissionManager.DENY_ACTION;
      break;
    case "unknown":
      value = nsIPermissionManager.UNKNOWN_ACTION;
      break;
    default:
      throw new Error("No idea what to set here!");
  }

  let uri = Components.classes["@mozilla.org/network/io-service;1"]
                      .getService(Components.interfaces.nsIIOService)
                      .newURI(url, null, null);
  Components.classes["@mozilla.org/permissionmanager;1"]
            .getService(Components.interfaces.nsIPermissionManager)
            .add(uri, permission, value);
}