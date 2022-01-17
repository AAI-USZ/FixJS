function scm_toggleScreen() {
    this._syncScreenEnabledValue();
    if (this.screenEnabled) {
      this.turnScreenOff();
    } else {
      this.turnScreenOn();
    }
  }