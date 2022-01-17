function(err, framed) {
        if(err) {
          return callback(err);
        }
        if(obj['@graph'].length === 0 ||
          obj['@graph'][0].signature === null) {
          return callback(new Error('[payswarm.verify] ' +
            'The message is not digitally signed.'));
        }
        callback(null, obj['@graph'][0]);
      }