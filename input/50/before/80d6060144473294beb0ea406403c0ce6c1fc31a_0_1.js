function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log('tweeted: ' + tweet);
    }