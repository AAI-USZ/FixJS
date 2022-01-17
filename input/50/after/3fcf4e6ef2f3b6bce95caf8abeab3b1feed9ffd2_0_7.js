function(editor){
      var states = this.getSelectionStates(editor);
      if(this.id === 'wysiwyg'){
        states.wysiwyg = true;
      } else {
        states.changeDataMode = this.id;
      }
      return states;
    }