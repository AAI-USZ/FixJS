function( val, time ) {
  // Avoid traffic jams
  if ( this.isRunning ) {
    return;
  }

  // Reset pinMode to PWM
  this.pinMode = this.firmata.MODES.PWM;

  var to = ( time || 1000 ) / ( (val || 255) * 2 ),
      direction = this.value <= val ? 1 : -1;

  priv.set( this, {
    isOn: true,
    isRunning: true,
    value: this.value
  });

  this.interval = setInterval(function() {
    var valueAt = this.value;

    if ( (direction > 0 && valueAt === 255) ||
          (direction < 0 && valueAt === 0) ||
            valueAt === val ) {

      this.stop();
    } else {
      this.brightness( valueAt + direction );
    }
  }.bind(this), to);

  return this;
}