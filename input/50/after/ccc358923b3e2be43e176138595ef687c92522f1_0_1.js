function(err, valid) {
          if(err) {
            return callback(err);
          }
          if(!valid) {
            return callback(new Error('[payswarm.verify] ' +
            'The message nonce is invalid.'));
          }
          callback();
        }