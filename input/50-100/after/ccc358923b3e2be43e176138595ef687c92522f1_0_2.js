function(result, callback) {
      try {
        // parse response
        callback(null, result);
      }
      catch(ex) {
        callback(new Error('[payswarm.postJsonLd] ' +
          'Invalid response from "' + url +
          '"; malformed JSON - ' + ex.toString() + ': ' +
          JSON.stringify(result, null, 2)));
      }
    }