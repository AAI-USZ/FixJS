function(err, valid) {
          if(err) {
            return callback(err);
          }
          if(!valid) {
            return callback(new Error('PaySwarm Security Exception: ' +
            'The message nonce is invalid.'));
          }
          callback();
        }