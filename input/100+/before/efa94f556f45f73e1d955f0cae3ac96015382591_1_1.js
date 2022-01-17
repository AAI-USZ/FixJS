function() {
  // console.log( "resolved" );
  var last, dirs;

  joystick = new five.Joystick({
    board: boards.controller,
    pins: [ "A0", "A1" ],
    freq: 100
  });

  led = new five.Led({
    board: boards.navigator,
    pin: 13
  });

  servo = new five.Servo({
    board: boards.navigator,
    pin: 12,
    range: [ 10, 170 ]
  });

  last = 1;
  dirs = [ "left", , "right" ];
  turn = [ "max", "center", "min" ];

  servo.center();

  joystick.on("axismove", function() {
    // 0: left, 1: center, 2: right
    var position = Math.ceil(2 * this.fixed.x);

    // console.log( position );

    // If the joystick has actually moved and it's
    // not in the center...
    if ( last !== position ) {
      last = position;

      if ( position !== 1 ) {
        console.log( dirs[ position ] );
      }


      servo[ turn[ position ] ]();
    }
  });
}