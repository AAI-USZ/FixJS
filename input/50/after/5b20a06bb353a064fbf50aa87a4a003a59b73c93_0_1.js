function(cb) {
      $r.zadd('tweets.cron', ctime, tweet.id_str, cb)
    }