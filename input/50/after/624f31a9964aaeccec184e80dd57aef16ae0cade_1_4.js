function(callback) {
      if(this.is("wysiwyg")) {
        this.currentMode.updateTextArea(this, callback);
      } else {
        this.currentMode.updatePreview(this, callback);
      }
    }