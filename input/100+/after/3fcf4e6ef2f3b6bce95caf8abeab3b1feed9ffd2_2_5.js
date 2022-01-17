function(editor) {
      return this.getSelection(editor, "\n\n").split(/\n\n+/);
    }