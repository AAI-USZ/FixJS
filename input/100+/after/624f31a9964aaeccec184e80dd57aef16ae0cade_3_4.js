function(editor, paragraphs) {
      var text = editor.textArea.val();
      paragraphs = paragraphs.join("\n\n");

      if(editor.boundaryStart === -1) {
        editor.textArea.val(text.slice(0,editor.boundaryStart) + paragraphs);
      } else {
        editor.textArea.val(text.slice(0,editor.boundaryStart) + paragraphs + text.slice(editor.boundaryEnd));
      }
      
      this.moveCaret(editor, paragraphs.length - editor.boundaryDistance);
    }