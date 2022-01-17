function onDocValueUpdate(json) {
      enableSaveBtns(true);
      editingNotice.text('');
      try {
        var parsedJSON = JSON.parse(json);
      } catch (error) {
        enableSaveBtns(false);
        enableDeleteBtn(true);
        error.explanatoryMessage = documentErrors.invalidJson;
        editingNotice.text(buildErrorMessage(error));
        return false;
      }
      return parsedJSON;
    }