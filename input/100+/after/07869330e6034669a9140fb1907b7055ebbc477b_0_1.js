function(newCfg, callback) {
      cfg = newCfg;
      // generate the asset
      console.log("Generating asset...");
      var assetUrl = listingService + 'payswarm.js/' + assetId;
      var asset = {
        '@context': 'http://purl.org/payswarm/v1',
        id: assetUrl + '#asset',
        type: ['ps:Asset', 'pto:WebPage'],
        creator: {
          fullName: 'publish-asset-for-sale.js Example'
        },
        title: assetName,
        assetContent: assetUrl,
        assetProvider: cfg.owner,
      };

      // sign the asset
      payswarm.sign(asset, {
        publicKeyId: cfg.publicKey.id,
        privateKeyPem: cfg.publicKey.privateKeyPem
      }, callback);
    }