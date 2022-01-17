function(err, certParamsArray) {
    // simplify error message
    if (err) {
      // allow through the malformed signature
      if (err == 'malformed signature' ||
          err == "assertion issued later than verification date" ||
          err == "assertion has expired")
        return cb(err);
      else
        return cb("bad signature in chain");
    }

    // what was the last PK in the successful chain?
    var lastPK = certParamsArray[certParamsArray.length - 1].certParams['public-key'];
    
    // now verify the assertion
    assertion.verify(signedAssertion, lastPK, now, function(err, payload, assertionParams) {
      if (err) return cb(err);
      
      // we're good!
      cb(null, certParamsArray, payload, assertionParams);
    });
  }