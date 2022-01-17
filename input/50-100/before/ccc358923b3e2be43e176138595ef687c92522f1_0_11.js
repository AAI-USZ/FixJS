function(callback, results) {
      var receipt = results.decode;
      if(jsonld.hasValue(receipt, 'type', 'err:Error')) {
        return callback(new Error('PaySwarm Purchase Exception: ' +
          receipt['err:message']));
      }
      // FIXME: use ps:Receipt
      if(!jsonld.hasValue(receipt, 'type', 'ps:Contract')) {
        return callback(new Error('PaySwarm Registration Exception: ' +
          'Invalid purchase response from PaySwarm Authority.'));
      }
      callback();
    }