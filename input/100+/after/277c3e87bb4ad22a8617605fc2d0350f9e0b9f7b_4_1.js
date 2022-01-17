function Led( opts ) {

  if ( !(this instanceof Led) ) {
    return new Led( opts );
  }

  opts = Board.options( opts );

  // Hardware instance properties
  this.board = Board.mount( opts );
  this.firmata = this.board.firmata;

  // LED instance properties
  this.value = 0;
  this.interval = null;

  // TODO: use pin capability checks for LED value writing.

  // Create a "state" entry for privately
  // storing the state of the led
  leds.push( this );

  priv.set( this, {
    isOn: false,
    isRunning: false,
    value: 0
  });

  Object.defineProperties( this, {
    value: {
      get: function() {
        return priv.get( this ).value;
      }
    },
    isOn: {
      get: function() {
        return priv.get( this ).isOn;
      }
    },
    isRunning: {
      get: function() {
        return priv.get( this ).isRunning;
      }
    },
    pinMode: {
      set: function( mode ) {
        // set pinMode
        // TODO: if setting to PWM, check if this pin is capable of PWM
        // log error if not capable
        if ( this.mode !== mode ) {
          this.mode = mode;
          this.firmata.pinMode( this.pin, this.mode );
        }
      }
    }
  });

  // TODO: determine pinMode based on pin?
  //       based on type property?
  this.pin = opts && opts.pin || 9;
  this.mode = null;
  this.pinMode = this.firmata.MODES[ opts.type && opts.type.toUpperCase() || "OUTPUT" ];
}