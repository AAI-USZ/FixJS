function(cb) {
      $r.zadd('tweets.ctime', cron, tweet.id_str, cb)
    }