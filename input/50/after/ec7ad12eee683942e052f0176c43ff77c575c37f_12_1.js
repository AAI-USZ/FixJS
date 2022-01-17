function scm_toggleScreen() {
    if (this.screenEnabled) {
      this.turnScreenOff();
    } else {
      this.turnScreenOn();
    }
  }