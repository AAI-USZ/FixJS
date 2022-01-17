function(err, trusted) {
        if(err) {
          return callback(err);
        }
        if(!trusted) {
          return callback(new Error('[payswarm.verify] ' +
          'The message is not signed by a trusted public key.'));
        }
        callback();
      }