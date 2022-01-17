function(editor) {
      console.log("updating TA in Mode " + this.name);
      editor.textArea.val(this.toText(editor));
    }