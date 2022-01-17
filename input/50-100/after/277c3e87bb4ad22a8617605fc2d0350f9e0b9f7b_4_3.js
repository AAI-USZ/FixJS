function( val ) {
  // Reset pinMode to PWM
  this.pinMode = this.firmata.MODES.PWM;

  this.firmata.analogWrite( this.pin, val );

  priv.set( this, {
    isOn: val ? true : false,
    isRunning: this.isRunning,
    value: val
  });

  return this;
}