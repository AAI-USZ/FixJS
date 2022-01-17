function( def ) {

    // Define a directional method and default speed
    five.Servo.prototype[ def[1] ] = function( speed ) {
      speed = speed || def[0];

      this.move( speed );
    };
  }