function(err, key) {
    if(!('publicKeyPem' in key)) {
      return callback(new Error('PaySwarm Security Exception: ' +
        'Could not get public key. Unknown format.'));
    }

    // cache public key
    api.cacheJsonLd(id, key, function(err) {
      if(err) {
        return callback(err);
      }
      callback(null, key);
    });
  }