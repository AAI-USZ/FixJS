function (type, editor) {
      if (this.options.editorOptions[editor] === undefined && editor !== null) {
        throw new Error("No editor " + editor + " configured");
      }
      this.options.editorWidgets[type] = editor;
    }