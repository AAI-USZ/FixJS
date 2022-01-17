function() {

    clearTimeout( timeout );
    equal( popcorn.error.code, 4, "Unsupported video reports error code 4." );
    popcorn.destroy();
    start();
  }