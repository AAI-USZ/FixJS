function( rate ) {
  // Avoid traffic jams
  if ( this.isRunning ) {
    return;
  }

  // Reset pinMode to OUTPUT
  this.pinMode = this.firmata.MODES.OUTPUT;

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