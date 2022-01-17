function(listingData, callback) {
      // frame the listingData
      var listingFrame = {
        '@context': api.createDefaultJsonLdContext(),
        type: 'ps:Listing'
      };
      jsonld.frame(listingData, listingFrame, callback);
    }