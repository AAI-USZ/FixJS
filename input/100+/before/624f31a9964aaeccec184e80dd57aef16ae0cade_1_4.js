function(modeId){
      var isInWysiwyg = this.is('wysiwyg');
      if(!modeId || modeId === this.currentMode.id) {
        return false;
      }
      this.changeMode(modeId);
      if(isInWysiwyg){
        this.changeMode('wysywyg');
      }
    }