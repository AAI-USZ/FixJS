function( rate ) {
  // Reset pinMode to OUTPUT
  if ( this.mode !== this.firmata.MODES.OUTPUT ) {
    this.mode = this.firmata.MODES.OUTPUT;
    this.firmata.pinMode( this.pin, this.mode );
  }

  // Avoid traffic jams
  // TODO: ensure that
  if ( priv.get(this).isRunning ) {
    return;
  }

  priv.set( this, {
    isOn: true,
    isRunning: true,
    value: this.value
  });

  this.interval = setInterval(function() {

    this.toggle();

  }.bind(this), rate || 100 );

  return this;
}