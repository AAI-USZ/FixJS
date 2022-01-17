function string2ArrayBuffer(string, callback) {
  //var bb = new WebKitBlobBuilder();
  //bb.append(string);

  var f = new FileReader();
  f.onload = function(e) {
    callback(e.target.result);
  }
  f.readAsArrayBuffer(new Blob([string]));
}