function scm_turnScreenOn() {
    if (this.screenEnabled)
      return false;

    navigator.mozPower.screenEnabled = this.screenEnabled = true;
    navigator.mozPower.screenBrightness = this._brightness;
    this.screen.classList.remove('screenoff');

    this.fireScreenChangeEvent();
    return true;
  }