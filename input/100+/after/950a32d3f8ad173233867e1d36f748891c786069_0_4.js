function(file, debug) {
    var boiler;
    if (debug == null) {
      debug = false;
    }
    boiler = new Boiler;
    boiler.debugging = debug;
    boiler.require(file);
    if (debug) {
      return '';
    } else {
      return boiler.serve();
    }
  }