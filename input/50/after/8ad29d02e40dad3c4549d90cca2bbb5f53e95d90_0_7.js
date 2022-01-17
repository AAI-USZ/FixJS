function revert(editor) {
    setPollingPaused(editor, true);
    CKCConnector.loadDocument(editor, function () {
      setPollingPaused(editor, false);
    });
  }