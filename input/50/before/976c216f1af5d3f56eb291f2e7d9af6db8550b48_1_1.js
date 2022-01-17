function(err, results) {
        if(err) {
          return callback(err);
        }
        cfg.publicKey.id = results.publicKey;
        cfg.publicKey.owner = results.owner;
        callback(null);
      }