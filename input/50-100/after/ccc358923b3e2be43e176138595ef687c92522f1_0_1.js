function(result, callback) {
      try {
        var parsed = JSON.parse(result);
      }
      catch(ex) {
        return callback(new Error('[payswarm.getJsonLd] ' +
          'Invalid response from "' + url + '"; malformed JSON.'));
      }

      // cache JSON-LD
      if(options.cache) {
        return api.cacheJsonLd(url, result, function(err) {
          callback(err, parsed);
        });
      }
      callback(null, parsed);
    }