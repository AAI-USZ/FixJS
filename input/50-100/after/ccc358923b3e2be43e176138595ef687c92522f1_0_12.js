function(callback, results) {
      var receipt = results.decode;
      if(!('assetAcquirer' in receipt) ||
        !('asset' in receipt) ||
        !('license' in receipt)) {
        return callback(new Error('[payswarm.getReceipt] ' +
          'Unknown Contract format.'));
      }
      callback();
    }