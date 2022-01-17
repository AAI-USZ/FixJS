function(err, certParamsArray, payload, assertionParams) {
    if (err) return cb(err);

    // audience must be browserid itself
    var want = urlparse(config.get('public_url')).originOnly();
    var got = urlparse(assertionParams.audience).originOnly();

    if (want.toString() !== got.toString()) {
      return cb("can't log in with an assertion for '" + got.toString() + "'");
    }

    // all is well, get the principal from the last cert
    cb(null, certParamsArray[certParamsArray.length-1].certParams.principal.email);
  }