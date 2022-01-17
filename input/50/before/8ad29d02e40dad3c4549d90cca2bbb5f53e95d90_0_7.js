function revert(editor) {
    pollingPaused = true;
    CKCConnector.loadDocument(editor, function () {
      pollingPaused = false;
    });
  }