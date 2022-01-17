function tryShowJson(obj) {
      var isError = obj instanceof Error;

      if (!isError) {
        removeSpecialKeys(obj);
      } else {
        enableSaveBtn(false);
      }

      editingNotice.text(isError && obj ? buildErrorMessage(obj) : '');
      jsonDocId.text(isError ? '' : obj._id);
      self.jsonCodeEditor.setValue(isError ? '' : JSON.stringify(obj, null, "  "));
      enableDeleteBtn(!isError);
      enableSaveAsBtn(!isError);
      showCodeEditor(!isError);
    }