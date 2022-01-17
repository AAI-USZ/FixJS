function(receipt, callback) {
      if(receipt.type && receipt.type.indexOf('ps:Contract') >= 0) {
        // print the receipt of sale to the console
        console.log('Successfully purchased', receipt.listing, '...');
        console.log('Transaction ID:', receipt.id);
        callback();
      }
      else
      {
        callback(new Error("[purchase-asset.js] " +
          JSON.stringify(receipt, null, 2)));
      }
    }