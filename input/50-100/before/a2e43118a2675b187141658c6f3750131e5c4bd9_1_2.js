function(listing, hash, callback) {
      // generate the purchase request
      var purchaseRequest = {
          '@context': 'http://purl.org/payswarm/v1',
          type: 'ps:PurchaseRequest',
          identity: options.buyer,
          listing: listing.id,
          listingHash: hash,
          source: options.source
        };

      // sign the purchase request
      api.sign(purchaseRequest, {
        publicKeyId: options.publicKey,
        privateKeyPem: options.privateKeyPem
      }, callback);
    }