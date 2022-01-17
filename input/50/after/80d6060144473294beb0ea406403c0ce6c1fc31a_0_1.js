function(err, data) {
      if (err) {
        console.error('tried to tweet: ' + tweet);
        console.error(err);
        process.exit(1);
      }
      console.log('tweeted: ' + tweet);
    }