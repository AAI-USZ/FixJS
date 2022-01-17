function(modeId, silent){
      var isInWysiwyg = this.is('wysiwyg'),
      dataMode = ME.getMode(modeId);
      if(!modeId || modeId === this.currentMode.id) {
        return false;
      }

      if(isInWysiwyg && dataMode.toText){
        this.dataType = modeId;
        this.checkState();
        this.syncEditors(silent);
      } else {
        this.changeMode(modeId);
      }
    }