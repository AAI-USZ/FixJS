function(editor, paragraphs) {
      var text = editor.textArea.val();
      paragraphs = paragraphs.join("\n\n");

      if(editor.rightBoundary === -1) {
        editor.textArea.val(text.slice(0,editor.leftBoundary) + paragraphs);
      } else {
        editor.textArea.val(text.slice(0,editor.leftBoundary) + paragraphs + text.slice(editor.rightBoundary));
      }
      
      this.moveCaret(editor, paragraphs.length - editor.boundaryDistance);
    }