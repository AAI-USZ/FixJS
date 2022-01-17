function(error, results) {
    var results
    if (!error) {
      results = JSON.parse(results.body)
    }
    cb(error, results && results.Results ? results.Results : null)
  }