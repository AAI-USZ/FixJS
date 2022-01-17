function nextTask() {
  cleanup();

  if (currentTaskIdx == manifest.length) {
    done();
    return;
  }
  var task = manifest[currentTaskIdx];
  task.round = 0;

  log('Loading file "' + task.file + '"\n');

  var absoluteUrl = combineUrl(window.location.href, task.file);
  getPdf(absoluteUrl, function nextTaskGetPdf(data) {
    var failure;
    function continuation() {
      task.pageNum = task.firstPage || 1;
      nextPage(task, failure);
    }
    try {
      var promise = PDFJS.getDocument(data);
      promise.then(function(doc) {
        task.pdfDoc = doc;
        continuation();
      }, function(e) {
        failure = 'load PDF doc : ' + e;
        continuation();
      });
      return;
    } catch (e) {
      failure = 'load PDF doc : ' + exceptionToString(e);
    }
    continuation();
  });
}