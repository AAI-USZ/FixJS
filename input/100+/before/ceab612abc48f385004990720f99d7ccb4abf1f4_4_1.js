function(certs, now, getRoot, cb) {
  if (!certs.length)
    return delay(cb)("certs must be an array of at least one cert");

  var rootIssuer;
  try {
    // the root
    rootIssuer = jwcrypto.extractComponents(certs[0]).payload.iss;
  } catch (x) {
    // can't extract components
    return delay(cb)("malformed signature");
  }

  // iterate through the certs
  function verifyCert(i, pk, certParamsArray, cb) {
    // do a normal verify on that cert
    verify(certs[i], pk, now, function(err, payload, assertionParams, certParams) {
      if (err) return cb(err);

      i += 1;
      certParamsArray.push({payload: payload,
                            assertionParams: assertionParams,
                            certParams: certParams});
      
      if (i >= certs.length)
        cb(null, certParamsArray, certParams['public-key']);
      else
        delay(verifyCert)(i, certParams['public-key'], certParamsArray, cb);
    });
  }
  
  // get the root public key
  getRoot(rootIssuer, function(err, rootPK) {
    if (err) return delay(cb)(err);

    verifyCert(0, rootPK, [], function(err, certParamsArray, lastPK) {
      if (err) return cb(err);

      // we're done
      cb(null, certParamsArray);
    });
    
  });    
  
}