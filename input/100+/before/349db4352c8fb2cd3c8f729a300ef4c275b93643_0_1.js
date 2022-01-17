function(err) {
        if(err) {
          return callback(err);
        }
        callback(null, {privateKey: privateKey, publicKey: publicKey});
      }