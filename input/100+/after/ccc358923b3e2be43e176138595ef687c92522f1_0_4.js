function(listing, options, callback) {
  // decrypt and verify message
  async.waterfall([
    function(callback) {
      api.hash(listing, function(err, hash) {
        callback(err, hash);
      });
    },
    function(hash, callback) {
      // generate the purchase request
      var purchaseRequest = {
        '@context': 'http://purl.org/payswarm/v1',
        type: 'ps:PurchaseRequest',
        identity: options.customer,
        listing: listing.id,
        listingHash: hash
      };
      if(options.source) {
        purchaseRequest.source = options.source;
      }

      // sign the purchase request
      api.sign(purchaseRequest, {
        publicKeyId: options.publicKey,
        privateKeyPem: options.privateKeyPem
      }, callback);
    },
    function(signedPurchaseRequest, callback) {
      // post the purchase request to the transaction service
      api.postJsonLd(
        options.transactionService, signedPurchaseRequest, callback);
    }
  ], callback);
}