function(callback) {
      if(!cfg.listingUrl) {
        prompt.start();

        // get the listing purchase URL
        prompt.get({
          properties: {
            listingUrl: {
              description: 'Enter the URL of the listing you want to purchase'
            }
          }
        }, function(err, results) {
          if(err) {
            return callback(err);
          }
          cfg.listingUrl = results.listingUrl;
          callback();
        });
      }
      else {
        callback();
      }
    }