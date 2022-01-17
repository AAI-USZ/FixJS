function() {
      if(this.htmlDiv.is(":empty")) {
        this.updatePreview();
      } else {
        this.updateTextArea();
      }
      this.editor.toolbar.loadModeToolbar();
      this.afterActivation();
    }