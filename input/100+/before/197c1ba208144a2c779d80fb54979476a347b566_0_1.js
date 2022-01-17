function(callback, results) {
      var normalized = results.normalize;
      if(normalized.length < 1)
      {
        return callback(new Error('payswarm.sign - ' +
        'The data to sign is empty. This error is most often generated ' +
        'when a @context was not supplied in the incoming data, which ' +
        'results in all terms and prefixes being undefined: ' +
        JSON.stringify(obj, null, 2)));
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