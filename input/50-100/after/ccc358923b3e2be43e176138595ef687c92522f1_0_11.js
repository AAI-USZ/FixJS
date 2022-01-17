function(callback, results) {
      var receipt = results.decode;
      if(jsonld.hasValue(receipt, 'type', 'err:Error')) {
        return callback(new Error('[payswarm.getReceipt] ' +
          receipt['err:message']));
      }
      // FIXME: use ps:Receipt
      if(!jsonld.hasValue(receipt, 'type', 'ps:Contract')) {
        return callback(new Error('[payswarm.getReceipt] ' +
          'Invalid purchase response from PaySwarm Authority.'));
      }
      callback();
    }