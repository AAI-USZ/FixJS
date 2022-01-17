function storeTemporaryKeypair(keypair) {
    storage.tempKeypair = JSON.stringify({
      publicKey: keypair.publicKey.toSimpleObject(),
      secretKey: keypair.secretKey.toSimpleObject()
    });
  }