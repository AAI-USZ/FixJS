function onDocValueUpdate(json) {
      enableSaveAsBtn(true);
      editingNotice.text('');
      try {
        var parsedJSON = JSON.parse(json);
      } catch (error) {
        enableSaveBtn(false);
        enableSaveAsBtn(false);
        enableDeleteBtn(true);
        error.explanatoryMessage = documentErrors.invalidJson;
        editingNotice.text(buildErrorMessage(error));
        return false;
      }
      return parsedJSON;
    }