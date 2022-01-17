function onStreamedTweet(tweet) {
  if (settings.ignoreRTs && tweet.text.indexOf('RT ') == 0) {
    console.log('Filtered out RT: ' + tweet.text)
    return
  }

  redisTweets.storeStream(tweet, function(err, storedTweet) {
    if (err) {
      console.log('Error storing Tweet: %s', err)
      return stop()
    }
    ee.emit('tweet', storedTweet)
  })
}