function PurpleOrionEditor(url, content, type) {
      this._orion_editor = editorInserter.createEditor(document.body, '100%');
      this._orion_editor.installTextView();
      this._orion_editor.setInput(url, undefined, content );   
    }