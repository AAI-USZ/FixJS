function(req, res) {
    req.headers['x-forwarded-proto'] || 'http'
  }