function tweetSomething() {
    var tweet = removeMentions(m.fill(m.pick(), Math.round((Math.random() * 100) + 20))).join(' ');
    tw.updateStatus(tweet, function(err, data) {
      if (err) {
        console.error('tried to tweet: ' + tweet);
        console.error(err);
        process.exit(1);
      }
      console.log('tweeted: ' + tweet);
    });
    setTimeout(tweetSomething, options.tweetInterval || 1000 * 60 * 60);
  }