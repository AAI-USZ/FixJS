function(callback) {
      // retrieve the listing from the Web
      payswarm.getJsonLd(cfg.listingUrl, {cache: true}, callback);
    }