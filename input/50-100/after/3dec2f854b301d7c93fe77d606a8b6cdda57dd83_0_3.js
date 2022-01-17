function(value) {
      var cmEditor;
      if (!cmd) {
        firebug._initialize();
      }
      cmEditor = cmd.getCommandEditor();
      if (value) {
        return cmEditor.editor.addEventListener('blur', firebug.run);
      } else if (!value) {
        return cmEditor.editor.removeEventListener('blur', firebug.run);
      }
    }