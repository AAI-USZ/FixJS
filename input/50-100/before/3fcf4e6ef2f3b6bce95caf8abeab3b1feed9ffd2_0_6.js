function(editor) {
        var modeInstance = new Mode(mode);
        
        modeInstance.load(editor);
        
        return modeInstance;
      }