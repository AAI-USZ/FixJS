function(err, keypair) {
          var assertionParams = {
            issuer : "foo.com",
            issuedAt : null,
            expiresAt : new Date((new Date()).getTime() + (6 * 60 * 60 * 1000))
          };
          
          // yes, we're signing our own public key, cause it's easier for now
          cert.sign({publicKey: keypair.publicKey, principal: {email: "user@example.com"}},
                    assertionParams, null, keypair.secretKey, function(err, signedObj) {
                      cert.verify(signedObj, keypair.publicKey, new Date(), self.callback);
                    });
        }