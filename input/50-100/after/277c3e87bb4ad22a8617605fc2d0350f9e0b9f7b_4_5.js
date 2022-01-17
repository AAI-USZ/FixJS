function() {
  clearInterval( this.interval );

  priv.set( this, {
    isOn: this.isOn,
    isRunning: false,
    value: this.value
  });

  return this;
}