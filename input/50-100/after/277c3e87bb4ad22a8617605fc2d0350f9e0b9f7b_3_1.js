function() {

  slider = new five.Sensor({
    pin: "A0",
    freq: 50
  });

  // log out the slider values to the console.
  slider.on("slide", function( err, value ) {
    if ( err ) {
      console.log( "error: ", err );
    } else {
      console.log( Math.floor(this.value) );
    }
  });
}