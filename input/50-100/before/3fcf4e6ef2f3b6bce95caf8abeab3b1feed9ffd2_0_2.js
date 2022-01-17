function(regexp){
      var match;
      regexp = new RegExp(regexp.source,'g');
      regexp.lastIndex = this.selectionEnd;
      match = regexp.exec(this.textArea.val());

      if(match && regexp.lastIndex == this.selectionEnd + match[0].length){
        this.selectionEnd += match[0].length;
        return match[0];
      }
    }