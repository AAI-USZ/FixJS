function(listingUrl, options, callback) {
  // decrypt and verify message
  async.waterfall([
    function(callback) {
      // retrieve the listing
      api.getJsonLd(listingUrl, {cache: true}, callback);
    },
    function(listingData, callback) {
      // frame the listingData
      var listingFrame = {
        '@context': api.createDefaultJsonLdContext(),
        type: 'ps:Listing',
        asset: {'@embed': false},
        license: {'@embed': false},
        signature: {'@embed': true}
      };
      jsonld.frame(listingData, listingFrame, callback);
    },
    function(framedListing, callback) {
      // FIXME: validate listing
      // generate the listing hash
      var listing = framedListing['@graph'][0];
      listing['@context'] = 'http://purl.org/payswarm/v1';
      api.hash(listing, function(err, hash) {
        callback(err, listing, hash);
      });
    },
    function(listing, hash, callback) {
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
      api.postJsonLd(
        options.transactionService, signedPurchaseRequest, callback);
    }
  ], callback);
}