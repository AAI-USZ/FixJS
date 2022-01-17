function(callback, results) {
      var prefs = results.decode;
      if(jsonld.hasValue(prefs, 'type', 'err:Error')) {
        return callback(new Error('PaySwarm Registration Exception: ' +
          prefs.errorMessage));
      }
      if(!jsonld.hasValue(prefs, 'type', 'ps:Preferences')) {
        return callback(new Error('PaySwarm Registration Exception: ' +
          'Invalid registration response from PaySwarm Authority.'));
      }
      callback();
    }