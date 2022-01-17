function(callback, results) {
      var verifier = crypto.createVerify('RSA-SHA1');
      if('nonce' in signInfo) {
        verifier.update(signInfo.nonce);
      }
      verifier.update(signInfo.created);
      verifier.update(results.normalize.data);
      var verified = verifier.verify(
        results.getPublicKey.publicKeyPem,
        signInfo.signatureValue, 'base64');
      if(!verified) {
        return callback(new Error('[payswarm.verify] ' +
          'The digital signature on the message is invalid.'));
      }
      callback();
    }