function(email, onComplete, onFailure) {
      prepareDeps();
      // jwcrypto depends on a random seed being set to generate a keypair.
      // The seed is set with a call to network.withContext.  Ensure the
      // random seed is set before continuing or else the seed may not be set,
      // the key never created, and the onComplete callback never called.
      network.withContext(function() {
        jwcrypto.generateKeypair({algorithm: "DS", keysize: bid.KEY_LENGTH}, function(err, keypair) {
          certifyEmailKeypair(email, keypair, onComplete, onFailure);
        });
      });
    }