function(modeId) {
      var nextMode;
      nextMode = this.getMode(modeId);
      this.commit();
      this.currentMode = nextMode;
      nextMode.activate();
    }