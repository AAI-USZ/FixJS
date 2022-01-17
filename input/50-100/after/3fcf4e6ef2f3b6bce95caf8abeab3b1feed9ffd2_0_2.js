function(editor, regexp){
      var match;
      regexp = new RegExp(regexp.source,'g');
      regexp.lastIndex = editor.selectionEnd;
      match = regexp.exec(editor.textArea.val());

      if(match && regexp.lastIndex == editor.selectionEnd + match[0].length){
        editor.selectionEnd += match[0].length;
        return match[0];
      }
    }