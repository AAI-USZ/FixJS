function terminate_tanasinn()
{
  Components
    .classes["@mozilla.org/observer-service;1"]
    .getService(Components.interfaces.nsIObserverService)
    .notifyObservers(null, "command/terminate-tanasinn", null);
}