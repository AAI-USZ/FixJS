function(editor, regexp){
      var match, substring = editor.textArea.val().slice(0,editor.selectionStart);
      regexp = new RegExp(regexp.source + "$");
      match = regexp.exec(substring);
      
      if(match){
        editor.selectionStart -= match[0].length;
        return match[0];
      }
    }