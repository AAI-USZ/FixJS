function(editor) {
      var html = textileCompiler.compile(editor.textArea.val());
      editor.htmlDiv.html(html);
    }