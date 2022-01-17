function (type, editor) {
      if (this.options.editorOptions[editor] === undefined) {
        throw new Error("No editor " + editor + " configured");
      }
      this.options.editorWidgets[type] = editor;
    }