function() {
  var center, degrees, step,vrange, scanner, soi, ping, last;


  // Open Radar view
  child.exec( "open http://localhost:8000/" );

  // Starting scanner scanning position (degrees)
  degrees = 1;

  // Servo scanning steps (degrees)
  step = 1;

  // Current facing direction
  facing = "";

  last = 0;

  // Scanning range (degrees)
  range = [ 0, 180 ];

  // Servo center point (degrees)
  center = range[ 1 ] / 2;

  // Redirection map
  redirect = {
    left: "right",
    right: "left"
  };


  // ping instance (distance detection)
  ping = new five.Ping(7);

  // Servo instance (panning)
  scanner = new five.Servo({
    pin: 12,
    range: range
  });

  this.repl.inject({
    scanner: scanner
  });

  // Initialize the scanner servo at 0°
  scanner.min();

  // Scanner/Panning loop
  this.loop( 50, function() {
    var bounds, isOver, isUnder;

    bounds = {
      left: center + 5,
      right: center - 5
    };

    isOver = degrees > scanner.range[1];
    isUnder = degrees <= scanner.range[0];

    // Calculate the next step position
    if ( isOver || isUnder ) {
      if ( isOver ) {
        io.sockets.emit("reset");
        degrees = 0;
        step = 1;
        last = -1;
      } else {
        step *= -1;
      }
    }

    // Update the position by N° step
    degrees += step;

    // Update servo position
    scanner.move( degrees );
  });

  io.sockets.on( "connection", function( socket ) {
    console.log( "Socket Connected" );

    soi = socket;

    ping.on("read", function() {

      if ( last !== degrees ) {
        io.sockets.emit( "ping", {
          degrees: degrees,
          distance: this.cm
        });
      }

      last = degrees;
    });
  });
}