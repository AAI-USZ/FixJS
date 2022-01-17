function() {
  // Reset pinMode to OUTPUT
  this.pinMode = this.firmata.MODES.OUTPUT;

  this.firmata.digitalWrite( this.pin, this.firmata.LOW );

  priv.set( this, {
    isOn: false,
    isRunning: false,
    value: 0
  });

  return this;
}