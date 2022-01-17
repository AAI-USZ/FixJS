function(editor, callback) {
      if(editor.htmlDiv.is(":empty")) {
        this.updatePreview(editor, callback);
      } else {
        this.updateTextArea(editor, callback);
      }
      editor.toolbar.loadModeToolbar(editor);
    }