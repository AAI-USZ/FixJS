function() {
      if(this.is("wysiwyg")) {
        this.getMode(this.dataType).updateTextArea();
      } else {
        this.currentMode.updatePreview();
      }
    }