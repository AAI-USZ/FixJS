function(callback, results) {
      var license = results.post;
      if(license === null || typeof license !== 'object') {
        return callback(new Error('PaySwarm Exception: ' +
          'Invalid response when caching license.'));
      }
      // FIXME: use JSON-LD exceptions
      if('message' in license) {
        return callback(new Error('PaySwarm Exception: ' +
          'Error while caching license: ' + license['message']));
      }
      callback(null, license);
    }