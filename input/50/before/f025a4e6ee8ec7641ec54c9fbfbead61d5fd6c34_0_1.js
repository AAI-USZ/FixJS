function(error, results) {
    var results = JSON.parse(results.body)
    var matches = results && results.Results ? results.Results : null
    cb(error, matches)
  }