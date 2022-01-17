function() {
  // Reset pinMode to OUTPUT
  if ( this.mode !== this.firmata.MODES.OUTPUT ) {
    this.mode = this.firmata.MODES.OUTPUT;
    this.firmata.pinMode( this.pin, this.mode );
  }

  this.firmata.digitalWrite( this.pin, this.firmata.LOW );

  priv.set( this, {
    isOn: false,
    isRunning: false,
    value: 0
  });

  return this;
}