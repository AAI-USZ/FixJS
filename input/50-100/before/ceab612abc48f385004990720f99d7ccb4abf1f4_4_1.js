function(err, payload, assertionParams) {
    if (err)
      return cb(err);

    // compatible with old format
    var publicKey = jwcrypto.loadPublicKey(JSON.stringify(payload['public-key']));
    delete payload['public-key'];
    var principal = payload.principal;
    delete payload.principal;
    cb(err, payload, assertionParams, {principal: principal, 'public-key': publicKey});
  }