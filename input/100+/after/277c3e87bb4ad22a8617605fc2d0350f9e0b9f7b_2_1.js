function() {

  count = -1;
  dirs = [ "cw", "ccw" ];
  lock = false;

  [
    // Medium Speed Counter Clock Wise
    [ 92, "ccw" ],
    // Medium Speed Clock Wise
    [ 88, "cw" ]

  ].forEach(function( def ) {

    // Define a directional method and default speed
    five.Servo.prototype[ def[1] ] = function( speed ) {
      speed = speed || def[0];

      this.move( speed );
    };
  });


  // Create a new `servo` hardware instance.
  servo = new five.Servo({
    pin: 9,
    // `type` defaults to standard servo.
    // For continuous rotation servos, override the default
    // by setting the `type` here
    type: "continuous"
  });


  // Create an I2C `Magnetometer` instance
  mag = new five.Magnetometer();

  // Inject the servo and magnometer into the REPL
  this.repl.inject({
    servo: servo,
    mag: mag
  });

  // set the continuous servo to stopped
  servo.move( 90 );

  // As the heading changes, log heading value
  mag.on("headingchange", function() {
    var log;

    log = ( this.bearing.name + " " + Math.floor(this.heading) + "°" );

    console.log(
      log[ colors[ this.bearing.abbr ] ]
    );



    if ( !lock && this.bearing.name === "North" ) {
      // Set redirection lock
      lock = true;

      // Redirect
      servo[ dirs[ ++count % 2 ] ]();

      // Release redirection lock
      board.wait( 2000, function() {
        lock = false;
      });
    }
  });

  this.wait( 2000, function() {
    servo[ dirs[ ++count % 2 ] ]();
  });
}