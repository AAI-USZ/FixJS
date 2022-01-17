function tryShowJson(obj) {
      var isError = obj instanceof Error;

      editingNotice.text(isError && obj ? buildErrorMessage(obj) : '');
      jsonDocId.text(isError ? '' : obj._id);
      self.jsonCodeEditor.setValue(isError ? '' : JSON.stringify(obj, null, "  "));
      enableDeleteBtn(!isError);
      enableSaveBtns(!isError);
      showCodeEditor(!isError);
    }