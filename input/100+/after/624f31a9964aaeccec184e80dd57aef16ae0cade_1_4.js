function(modeId, silent) {
      var editor = this,
      nextMode = ME.getMode(modeId),
      oldMode = editor.currentMode;

      // TODO warn about mode change here
      this.warnIfNecessary(oldMode,nextMode, function(){
        editor.beginModeChange();
        console.log('+++++ changeMode start ' + modeId);
        
        editor.synchronize(function(){
          editor.oldMode = oldMode;
          editor.currentMode = nextMode;
          nextMode.activate(editor, function(){
            console.log('+++++ changeMode finished ' + modeId);
            nextMode.afterActivation(editor);
            editor.checkState();

            delete editor.oldMode;
            editor.finalizeModeChange(silent);
          });
        });
      }, silent);
    }