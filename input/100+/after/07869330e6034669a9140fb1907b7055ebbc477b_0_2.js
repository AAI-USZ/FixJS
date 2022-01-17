function(signedAsset, assetHash, callback) {
      // generate the listing validity dates
      var validFrom = new Date();
      var validUntil = new Date();
      validUntil.setFullYear(validFrom.getFullYear() + 1);

      // generate the listing
      console.log("Generating listing...");
      var listingUrl = listingService + 'payswarm.js/' + assetId;

      var listing = {
        '@context': 'http://purl.org/payswarm/v1',
        id: listingUrl + '#listing',
        type: ['ps:Listing', 'gr:Offering'],
        payee: [{
          id: listingUrl + '#listing-payee-1',
          type: 'com:Payee',
          destination: 'https://payswarm.dev:19443/i/vendor/accounts/primary',
          payeePosition: 0,
          payeeRate: price,
          payeeRateType: 'com:FlatAmount',
          comment: 'Payment for Test Asset ' + assetId + '.'
        }],
        payeeRule : [{
          type: 'com:PayeeRule',
          accountOwnerType: 'ps:Authority',
          maximumPayeeRate: '10.0000000',
          payeeRateContext: ['com:Inclusive', 'com:Tax', 'com:TaxExempt'],
          payeeRateType: 'com:Percentage'
        }],
        asset: listingUrl + '#asset',
        assetHash: assetHash,
        license: 'http://purl.org/payswarm/licenses/blogging',
        licenseHash: 'ad8f72fcb47e867231d957c0bffb4c02d275926a',
        validFrom: payswarm.w3cDate(validFrom),
        validUntil: payswarm.w3cDate(validUntil),
      };

      // sign the listing
      payswarm.sign(listing, {
        publicKeyId: cfg.publicKey.id,
        privateKeyPem: cfg.publicKey.privateKeyPem
      }, function(err, signedListing) {
        callback(err, signedAsset, signedListing);
      });
    }