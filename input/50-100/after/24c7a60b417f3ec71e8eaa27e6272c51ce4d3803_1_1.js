function(err, signedAssertion) {
        if (err) cb(err);
        else {
          var assertion = jwcrypto.cert.bundle(obj.cert, signedAssertion);
          cb(null, {
            audience: obj.audience,
            assertion: assertion,
            expirationDate: expirationDate
          });
        }
      }