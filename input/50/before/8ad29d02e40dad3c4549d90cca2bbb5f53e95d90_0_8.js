function () {
      if (instanceDestroyed == false) {
        if (!getDocumentId()) {
          displayMessage('WARNING', lang.unsavedDocumentWarning);
          checkUnsaved(editor);
        }
      }
    }