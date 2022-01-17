function(issuer, next) {
    // issuer cannot be the browserid
    if (issuer === HOSTNAME) {
      next("cannot authenticate to browserid with a certificate issued by it.");
    } else {
      exports.getPublicKey(issuer, function(err, pubKey) {
        if (err) return next(err);
        next(null, pubKey);
      });
    }
  }