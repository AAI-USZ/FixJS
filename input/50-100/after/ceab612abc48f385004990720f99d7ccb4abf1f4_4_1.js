function(err, payload, assertionParams) {
    if (err)
      return cb(err);

    // compatible with old format
    var originalComponents = jwcrypto.extractComponents(signedObject);
    var certParams = extractCertParamsFrom(payload, originalComponents);
    
    // make the key appear under both public-key and publicKey
    cb(err, payload, assertionParams, certParams);
  }