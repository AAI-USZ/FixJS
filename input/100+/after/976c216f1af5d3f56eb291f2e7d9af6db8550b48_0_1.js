function(newCfg, callback) {
      cfg = newCfg;
      // generate the asset
      var assetUrl = listingService + 'payswarm.js/' + assetId;
      var asset = {
        id: assetUrl + '#asset',
        type: ['ps:Asset', 'pto:WebPage'],
        creator: {
          fullName: 'publish-asset-for-sale.js Example'
        },
        title: assetName,
        assetContent: assetUrl,
        assetProvider: cfg.publicKey.owner,
      };

      // sign the asset
      payswarm.sign(asset, {
        publicKeyId: cfg.publicKey.id,
        privateKeyPem: cfg.publicKey.privateKeyPem
      }, callback);
    }