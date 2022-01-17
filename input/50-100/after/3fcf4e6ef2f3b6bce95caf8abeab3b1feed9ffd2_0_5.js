function() {
      if(this.is("wysiwyg")) {
        ME.getMode(this.dataType).updateTextArea(this);
      } else {
        this.currentMode.updatePreview(this);
      }
    }