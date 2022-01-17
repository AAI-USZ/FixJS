function shutdown(data, reason) 
{
  var process = Components.classes['@zuse.jp/tanasinn/process;1']
        .getService(Components.interfaces.nsISupports)
        .wrappedJSObject,
      io_service = Components
        .classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService);

  process.notify("event/disabled");
  process.uninitialize();

  io_service.getProtocolHandler("resource")
    .QueryInterface(Components.interfaces.nsIResProtocolHandler)
    .setSubstitution("tanasinn", null);

  process.notify("event/shutdown");

  process.destroy();
  process.clear();

  return true;
}