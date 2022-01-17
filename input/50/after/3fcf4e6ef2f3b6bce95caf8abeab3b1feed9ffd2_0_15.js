function(modeId) {
      var nextMode;
      nextMode = ME.getMode(modeId);
      this.synchronize();
      this.currentMode = nextMode;
      nextMode.activate(this);
    }