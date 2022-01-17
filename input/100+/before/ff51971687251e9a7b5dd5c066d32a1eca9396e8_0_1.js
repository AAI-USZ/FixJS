function(callback, results) {
      var normalized = results.normalize;
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