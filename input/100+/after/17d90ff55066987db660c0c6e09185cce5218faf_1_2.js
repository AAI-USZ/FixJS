function(id, url) {
  builder.plugins.downloadingCount++;
  jQuery('#plugins-downloading').show();
  
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (oEvent) {
    var arrayBuffer = oReq.response; // Note: not oReq.responseText
    if (arrayBuffer) {
      var byteArray = new Uint8Array(arrayBuffer);
      var str = "";
      for (var i = 0; i < byteArray.length; i++) {
        str += String.fromCharCode(byteArray[i]);
      }
      var f = builder.plugins.getZipForPlugin(id);
      f.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0600);
      var stream = Components.classes["@mozilla.org/network/safe-file-output-stream;1"].
                   createInstance(Components.interfaces.nsIFileOutputStream);
      stream.init(f, 0x04 | 0x08 | 0x20, 0600, 0); // readwrite, create, truncate
      stream.write(str, byteArray.length);
      if (stream instanceof Components.interfaces.nsISafeOutputStream) {
        stream.finish();
      } else {
        stream.close();
      }
      builder.plugins.downloadSucceeded(id);
    } else {
      builder.plugins.downloadFailed(id, url + " not found");
    }
  };

  oReq.send(null);
}