function (disabled) {
    tau.ui.Button.$super.setDisabled.apply(this, arguments);
    this._state = disabled ? 'disabled' : 'normal';
  }