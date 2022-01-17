function(req, res) {
    return req.headers['x-forwarded-proto'] || 'http';
  }