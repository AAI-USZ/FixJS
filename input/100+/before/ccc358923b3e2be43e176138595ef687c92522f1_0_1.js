function(callback, results) {
      var normalized = results.normalize;
      if(normalized.length === 0) {
        return callback(new Error('PaySwarm Security Exception: ' +
          'The data to sign is empty. This error may be caused because ' +
          'a "@context" was not supplied in the input which would cause ' +
          'any terms or prefixes to be undefined. ' +
          'Input: ' + JSON.stringify(obj, null, 2)));
      }
      // generate base64-encoded signature
      var signer = crypto.createSign('RSA-SHA1');
      if(nonce !== null) {
        signer.update(nonce);
      }
      signer.update(dateTime);
      signer.update(normalized);
      var signature = signer.sign(privateKeyPem, 'base64');
      callback(null, signature);
    }