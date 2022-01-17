function( time ) {
  // Reset pinMode to PWM
  // TODO: check if this pin is capable of PWM
  //       log error if not capable
  if ( this.mode !== this.firmata.MODES.PWM ) {
    this.mode = this.firmata.MODES.PWM;
    this.firmata.pinMode( this.pin, this.mode );
  }

  var to = ( time || 1000 ) / ( 255 * 2 ),
      ref = priv.get( this );

  // Avoid traffic jams
  if ( ref.isRunning ) {
    return;
  }

  priv.set( this, {
    isOn: true,
    isRunning: true,
    value: ref.value
  });

  this.interval = setInterval(function() {
    var valueAt = priv.get( this ).value;

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