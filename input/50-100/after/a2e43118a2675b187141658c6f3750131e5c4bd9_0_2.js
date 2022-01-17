function(callback) {
      // perform the purchase
      payswarm.purchase(cfg.listingUrl, {
        transactionService: authority + 'transactions',
        customer: cfg.owner,
        source: cfg.source,
        publicKey: cfg.publicKey.id,
        privateKeyPem: cfg.publicKey.privateKeyPem
      }, callback);
    }