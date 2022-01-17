function(){
      var states = this.getSelectionStates();
      if(this.id === 'wysiwyg'){
        states.wysiwyg = true;
      } else {
        states.changeDataMode = this.id;
      }
      return states;
    }