function save(editor, callback) {
    if (getDocumentId(editor)) {
      CKCConnector.checkUpdates(editor, function () {
        CKCConnector.saveChanges(editor, callback);
      });
    } else {
      CKCConnector.createDocument(editor, function () {
        displayMessage('INFO', lang.documentCreatedMessage);
        checkUpdates(editor);
        if ((typeof callback) == "function") {
          callback();
        }
      });
    }
  }