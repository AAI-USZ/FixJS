function( time ) {
  // Avoid traffic jams
  if ( this.isRunning ) {
    return;
  }

  // Reset pinMode to PWM
  this.pinMode = this.firmata.MODES.PWM;

  var to = ( time || 1000 ) / ( 255 * 2 );

  priv.set( this, {
    isOn: true,
    isRunning: true,
    value: this.value
  });

  this.interval = setInterval(function() {
    var valueAt = this.value;

    if ( valueAt === 0 ) {
      direction = 1;
    }

    if ( valueAt === 255 ) {
      direction = -1;
    }

    this.brightness( valueAt + direction );

  }.bind(this), to);

  return this;
}