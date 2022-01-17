function(err, kp) {
    if (err) return cb(err);
    
    self._keyPair = kp;
    
    var expiration = new Date();
    expiration.setTime(new Date().valueOf() + 60 * 60 * 1000);
    
    jwcrypto.cert.sign(self._keyPair.publicKey, {email: self.options.email},
                       {expiresAt: expiration, issuer: self.options.domain, issuedAt: new Date()},
                       {}, g_privKey, function(err, signedCert) {
                         if (err) return cb(err);
                         self._cert = signedCert;
                         
                         cb(null);
                       });
  }