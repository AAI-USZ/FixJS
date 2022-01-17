function (x, qval) {
    // XXX should use a canonicalizing representation, so that we
    // don't get screwed by key order
    var parts = {};
    var remaining = 0;
    _.each(qval, function (q) {
      var hash = JSON.stringify(q);
      if (!(hash in parts)) {
        parts[hash] = true;
        remaining++;
      }
    });

    for (var i = 0; i < x.length; i++) {
      var hash = JSON.stringify(x[i]);
      if (parts[hash]) {
        delete parts[hash];
        remaining--;
        if (0 === remaining)
          return true;
      }
    }

    return false;
  }