function resume_tanasinn(tanasinn_class, data)
{
  var io_service = Components
        .classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService);

  // reserve 'resource://tanasinn'
  io_service.getProtocolHandler("resource")
    .QueryInterface(Components.interfaces.nsIResProtocolHandler)
    .setSubstitution("tanasinn", uri)

  tanasinn_class.getService(Components.interfaces.nsISupports)
    .wrappedJSObject
    .notify("event/enabled");
}