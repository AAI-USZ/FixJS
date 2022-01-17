function(err, displayTweets) {
      if (err) throw err
      next(displayTweets)
    }