function(editor) {
      this.editor = editor;
      this.composer = editor.composer;
      this.element = this.composer.element;
      
      var initialValue = this.composer.getValue();
      this.history = [initialValue];
      this.historyWithCaret = [initialValue];
      this.position = 1;
      
      this._observe();
    }