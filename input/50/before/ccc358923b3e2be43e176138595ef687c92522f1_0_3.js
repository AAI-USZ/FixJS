function(callback) {
      // retrieve the listing
      api.getJsonLd(listingUrl, {cache: true}, callback);
    }