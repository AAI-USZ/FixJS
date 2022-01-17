function(cb) {
  this.apiGetCall(this.getStatsUrl(), function(error, results) {
    var stats = JSON.parse(results.body)
    cb(error, stats)
  })
}