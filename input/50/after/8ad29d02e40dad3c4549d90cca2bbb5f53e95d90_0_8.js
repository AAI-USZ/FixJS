function () {
      if (isExistingInstance(editor)) {
        if (!getDocumentId(editor)) {
          displayMessage('WARNING', lang.unsavedDocumentWarning);
          checkUnsaved(editor);
        }
      }
    }