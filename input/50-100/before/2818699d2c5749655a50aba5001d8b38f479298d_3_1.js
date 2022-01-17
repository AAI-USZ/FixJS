function(editor, textarea, composer) {
      this.editor   = editor;
      this.textarea = textarea;
      this.composer = composer;

      this._observe();
    }