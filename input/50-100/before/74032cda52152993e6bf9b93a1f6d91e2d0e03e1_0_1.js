function(cb) {
    // see if we have window.crypto.getRandomValues
    if (window.crypto && window.crypto.getRandomValues) {
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