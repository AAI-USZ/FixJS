function(editor, string, collapseToStart) {
      var textArea = editor.textArea,
      newSelectionStart = editor.selectionStart,
      newSelectionEnd = editor.selectionStart + string.length;

      // gecko & webkit
      textArea.val(textArea.val().slice(0, editor.selectionStart) + string + textArea.val().slice(editor.selectionEnd, textArea.val().length));

      // move caret gecko
      if(collapseToStart === true){
        newSelectionEnd = newSelectionStart;
      } else if(collapseToStart === false){
        newSelectionStart = newSelectionEnd;
      }

      editor.setSelectionRange(newSelectionStart, newSelectionEnd);
      textArea.focus();
    }