function(result, callback) {
      try {
        // parse response
        callback(null, result);
      }
      catch(ex) {
        callback(new Error(
          'Invalid response from "' + url +
          '"; malformed JSON - ' + ex.toString() + ': ' +
          JSON.stringify(result, null, 2)));
      }
    }