function(html) {
      this.composer.setValue(html);
      var placeholder = this.composer.sandbox.getDocument().getElementById(CARET_PLACEHOLDER);
      if (placeholder) {
        this.composer.selection.setAfter(placeholder);
        silentRemove(placeholder);
      } else {
        this.editor.focus(true);
      }
    }