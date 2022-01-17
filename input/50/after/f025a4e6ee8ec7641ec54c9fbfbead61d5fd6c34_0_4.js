function(error, results) {
    var stats
    if (!error) {
      stats = JSON.parse(results.body)
    }
    cb(error, stats)
  }