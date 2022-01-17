function arrayBuffer2String(buf, callback) {
  var bb = new WebKitBlobBuilder();
  bb.append(buf);
  var f = new FileReader();
  f.onload = function(e) {
    callback(e.target.result)
  }
  f.readAsText(bb.getBlob());
}