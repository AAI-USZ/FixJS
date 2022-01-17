function(err, sites) {
    if (err) {
      util.error(err.message)
      res.writeHead(500)
      res.end()
    }
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(sites)
  }