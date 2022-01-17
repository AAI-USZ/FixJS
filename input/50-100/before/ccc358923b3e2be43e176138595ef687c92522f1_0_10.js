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
    }