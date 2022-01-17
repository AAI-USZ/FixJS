function(cb) {
    var has_getrandomvalues = false;
    try {
      has_getrandomvalues = !! window.crypto.getRandomValues;
    } catch (x) {
      // apparently just trying to touch window.crypto will
      // throw an exception on some platforms, so we have to be
      // ultra stoopid about how we do this
    }

    if (has_getrandomvalues) {
      // then sjcl already seeded itself
      if (cb)
        delay(cb)();
    } else {
      sjcl.random.addEventListener('seeded', function(blarg) {
        // no passing of arguments to the callback
        if (cb)
          cb();
      });

      // tell sjcl to start collecting some entropy      
      sjcl.random.startCollectors();
    }
  }