function(callback) {
      if(cfg.listingUrl) {
        return callback();
      }

      // get the listing purchase URL from stdin
      prompt.start();
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