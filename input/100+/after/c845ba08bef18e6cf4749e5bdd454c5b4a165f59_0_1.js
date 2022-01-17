function(err, response, body) {
        if(!err && response.statusCode >= 400) {
          err = JSON.stringify(body, null, 2);
        }
        if(err) {
          console.log('Failed to register signed asset and listing: ',
            err.toString());
          return callback(err);
        }

        if(verbose) {
          console.log('Registered signed asset and listing: ' +
            JSON.stringify(assetAndListing, null, 2));
        }
        else {
          console.log('Registered signed asset: ', signedAsset.id);
          console.log('Registered signed listing: ', signedListing.id);
        }
        callback(null);
      }