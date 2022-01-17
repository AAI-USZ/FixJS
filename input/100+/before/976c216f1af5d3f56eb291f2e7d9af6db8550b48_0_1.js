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

      // set the options to use when signing the asset
      var signingOptions = {};
      signingOptions.publicKeyId = cfg.publicKey.id;
      signingOptions.privateKeyPem = cfg.publicKey.privateKeyPem;

      // sign the asset
      payswarm.sign(asset, signingOptions, callback);
    }