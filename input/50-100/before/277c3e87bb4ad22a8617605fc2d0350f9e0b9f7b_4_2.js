function() {
  // Reset pinMode to OUTPUT
  if ( this.mode !== this.firmata.MODES.OUTPUT ) {
    this.mode = this.firmata.MODES.OUTPUT;
    this.firmata.pinMode( this.pin, this.mode );
  }

  var ref = priv.get( this );

  if ( ref.isOn || ref.isRunning ) {
    this.off();
  } else {
    this.on();
  }

  return this;
}