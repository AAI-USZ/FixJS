function(regexp){
      var match, substring = this.textArea.val().slice(0,this.selectionStart);
      regexp = new RegExp(regexp.source + "$");
      match = regexp.exec(substring);
      
      if(match){
        this.selectionStart -= match[0].length;
        return match[0];
      }
    }