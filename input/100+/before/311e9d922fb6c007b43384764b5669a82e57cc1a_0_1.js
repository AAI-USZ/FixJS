function() {
  var ioService = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
  if ('jar:' == Components.stack.filename.substr(0, 4)) {
    // Unpacked XPI case.
    return Components.stack.filename.replace(/\!\/.*/, '');
  } else if ('file:' == Components.stack.filename.substr(0, 5)){
    // Raw file, development case.
    // Turn the file:/// URL into an nsIFile ...
    var uri = ioService.newURI(Components.stack.filename, null, null);
    var file = uri.QueryInterface(Components.interfaces.nsIFileURL).file;
    // ... to find the containing directory.
    var dir = file.parent.parent;
    // Then get the URL back for that path.
    return ioService.newFileURI(dir).spec;
  } else {
    throw Error('Could not detect gExtensionPath!');
  }
}