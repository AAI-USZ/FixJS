function(string, collapseToStart) {
      var textArea = this.textArea,
      newSelectionStart = this.selectionStart,
      newSelectionEnd = this.selectionStart + string.length;

      // gecko & webkit
      textArea.val(textArea.val().slice(0, this.selectionStart) + string + textArea.val().slice(this.selectionEnd, textArea.val().length));

      // move caret gecko
      if(collapseToStart === true){
        newSelectionEnd = newSelectionStart;
      } else if(collapseToStart === false){
        newSelectionStart = newSelectionEnd;
      }

      textArea[0].setSelectionRange(newSelectionStart, newSelectionEnd);
      textArea.focus();
    }