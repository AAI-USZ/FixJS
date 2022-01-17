function(editor) {
      if(editor.htmlDiv.is(":empty")) {
        this.updatePreview(editor);
      } else {
        this.updateTextArea(editor);
      }
      editor.toolbar.loadModeToolbar(editor);
      this.afterActivation(editor);
    }