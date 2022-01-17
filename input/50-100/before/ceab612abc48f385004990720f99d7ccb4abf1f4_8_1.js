function(err, kp) {
          // stash it away
          keypair = kp;
              
          var assertionParams = {
            issuer : "issuer.com",
            issuedAt : new Date(),
            expiresAt : new Date((new Date()).getTime() + (6 * 60 * 60 * 1000))
          };
          
          // yes, we're signing our own public key, cause it's easier for now
          cert.sign(keypair.publicKey, {email: "john@issuer.com"},
                    assertionParams, null, keypair.secretKey, self.callback);
        }