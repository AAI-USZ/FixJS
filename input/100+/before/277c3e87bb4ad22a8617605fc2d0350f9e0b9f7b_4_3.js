function( val, time ) {
  // Reset pinMode to PWM
  // TODO: check if this pin is capable of PWM
  //       log error if not capable
  if ( this.mode !== this.firmata.MODES.PWM ) {
    this.mode = this.firmata.MODES.PWM;
    this.firmata.pinMode( this.pin, this.mode );
  }

  var to = ( time || 1000 ) / ( (val || 255) * 2 ),
      direction = priv.get( this ).value <= val ? 1 : -1;

  this.interval = setInterval(function() {
    var valueAt = priv.get( this ).value;

    if ( (direction > 0 && valueAt === 255) ||
          (direction < 0 && valueAt === 0) ||
            valueAt === val ) {

      clearInterval( this.interval );
    } else {
      this.brightness( valueAt + direction );
    }
  }.bind(this), to);

  return this;
}