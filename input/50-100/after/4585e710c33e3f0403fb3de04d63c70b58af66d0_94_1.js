function Provisioning(info, onsuccess, onfailure) {
    if(status === Provisioning.AUTHENTICATED) {
      if (!keypair) {
        // JWCrypto relies on there being a random seed.  The random seed is
        // gotten whenever network.withContext is called.  Since this is
        // supposed to mock the IdP provisioning step which will not call
        // network.withContext, add a random seed to ensure that we can get our
        // keypair.
        jwcrypto.addEntropy("H+ZgKuhjVckv/H4i0Qvj/JGJEGDVOXSIS5RCOjY9/Bo=");
        jwcrypto.generateKeypair({algorithm: "DS", keysize: 256}, function(err, kp) {
          keypair = kp;
          if (onsuccess) onsuccess(keypair, cert);
        });
      }
      else {
        if (onsuccess) onsuccess(keypair, cert);
      }
    }
    else onfailure(failure);
  }