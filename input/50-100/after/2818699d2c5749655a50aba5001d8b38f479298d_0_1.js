function(editor, textarea, composer) {
      this.editor   = editor;
      this.textarea = textarea;
      this.composer = composer;

      this.firstTime = true;
      this.dirty = false;
      this.htmlCache = null;

      this._observe();
    }