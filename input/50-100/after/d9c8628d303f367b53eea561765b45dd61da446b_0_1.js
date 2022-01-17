function(issuer, next) {
    // allow assertions rooted in certs issued by us.  this occurs in the proxy_idp case
    // where we sign assertions for other domains.
    if (issuer === HOSTNAME) {
      next(null, PUBLIC_KEY);
    } else {
      exports.getPublicKey(issuer, function(err, pubKey) {
        if (err) return next(err);
        next(null, pubKey);
      });
    }
  }