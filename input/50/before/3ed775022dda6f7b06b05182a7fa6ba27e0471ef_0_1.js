function(x) {
    // allow single hostnames, e.g. localhost
    if (typeof x !== 'string' || !x.match(/^https?:\/\/[a-z\d_-]+(\.[a-z\d_-]+)*(:\d+)?$/i)) {
      throw "not a valid origin";
    }
  }