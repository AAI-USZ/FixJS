function executeScript() {
  var s = $('#script').val();
  try {
    esprima.parse(s);
  } catch (e) {
    if (e.index) {
      $('#script').focus();
      var trailing = $('#script').val().substr(e.index);
      var length = trailing.indexOf('\n', 1);
      if (length == -1) {
        length = trailing.length;
      }
      $('#script')[0].setSelectionRange(e.index, e.index+length);
    }
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