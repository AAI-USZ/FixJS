function step() {
    if(forge.pki.rsa.stepKeyPairGenerationState(state, 1)) {
      // get keys in PEM-format
      var privateKey = forge.pki.privateKeyToPem(state.keys.privateKey);
      var publicKey = forge.pki.publicKeyToPem(state.keys.publicKey);

      if(!('storeKeyPair' in hooks)) {
        return callback(null, {privateKey: privateKey, publicKey: publicKey});
      }
      
      // store key pair
      return hooks.storeKeyPair(publicKey, privateKey, function(err) {
        if(err) {
          return callback(err);
        }
        callback(null, {privateKey: privateKey, publicKey: publicKey});
      });
    }
    process.nextTick(step);
  }