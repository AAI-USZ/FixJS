function(editor) {
      var paragraphs = this.getSelection(editor, "\n\n"),
      startTrace = editor.selectionStart - editor.boundaryStart,
      endTrace = editor.selectionEnd - editor.boundaryStart,
      trace = textileCompiler.trace(paragraphs, startTrace, endTrace);
      
      return this.buildStateObject(trace, editor.currentNodes = {});
    }