function executeScript() {
  var s = $('#script').val();
  try {
    esprima.parse(s);
  } catch (e) {
    showResult({error: e+''});
    return;
  }
  setDocument(null, s);
  var metadata = parseMetadata($('#script').val());
  var data = {functionName: metadata[0]['function']};
  iframeLoad(function () {
    iwindow().postMessage("scrape:" + JSON.stringify(data), "*");
  });
}