function scm_turnScreenOff() {
    this._syncScreenEnabledValue();
    if (!this.screenEnabled)
      return false;

    navigator.mozPower.screenBrightness = 0.0;

    this.screenEnabled = false;
    this.screen.classList.add('screenoff');
    setTimeout(function realScreenOff() {
      navigator.mozPower.screenEnabled = false;
    }, 20);

    this.fireScreenChangeEvent();
    return true;
  }