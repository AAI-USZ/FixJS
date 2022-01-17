function(err, kp) {
        keypair = kp;
        trans.complete(keypair.publicKey.toSimpleObject());
      }