function( val ) {

  if ( this.mode !== this.firmata.MODES.PWM ) {
    this.mode = this.firmata.MODES.PWM;
    this.firmata.pinMode( this.pin, this.mode );
  }

  this.firmata.analogWrite( this.pin, val );

  priv.set( this, {
    isOn: val ? true : false,
    isRunning: val ? true : false,
    value: val
  });

  return this;
}