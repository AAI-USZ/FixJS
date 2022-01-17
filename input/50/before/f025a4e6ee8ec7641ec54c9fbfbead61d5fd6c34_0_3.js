function(error, results) {
    var results = JSON.parse(results.body)
    cb(error, results && results.TotalResults ? results.TotalResults : null)
  }