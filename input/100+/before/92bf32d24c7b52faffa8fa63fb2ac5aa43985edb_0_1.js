function start_tanasinn(tanasinn_class, data)
{
  var io_service = Components
        .classes["@mozilla.org/network/io-service;1"]
        .getService(Components.interfaces.nsIIOService),
      uri = io_service.newFileURI(data.installPath.clone()),
      file_handler, // nsIFileProtocolHandler
      process,      // tanasinn's Process object
      process_url,  // the location of process.js
      message;      // error message

  // reserve 'resource://tanasinn'
  io_service.getProtocolHandler("resource")
    .QueryInterface(Components.interfaces.nsIResProtocolHandler)
    .setSubstitution("tanasinn", uri)

  try {
    file_handler = io_service.getProtocolHandler("file")
      .QueryInterface(Components.interfaces.nsIFileProtocolHandler);

    process = data.installPath.clone();
    process.append("modules");
    process.append("common");
    process.append("process.js");

    process_url = file_handler.getURLSpecFromFile(process);

    Components
      .classes["@mozilla.org/moz/jssubscript-loader;1"]
      .getService(Components.interfaces.mozIJSSubScriptLoader)
      .loadSubScript(process_url);

  } catch(e) {
    message = e.fileName + ":" + e.lineNumber + " " + e.toString();
    Components.reportError(message);
    return false;
  }
  return true;
}