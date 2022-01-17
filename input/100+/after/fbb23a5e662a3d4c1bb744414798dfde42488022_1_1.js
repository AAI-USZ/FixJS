function(options) {
  if (typeof options.timeout === 'undefined') {
    options.timeout = 2000;
  }
  function accessDenied(res) {
    res.writeHead(401, {'WWW-Authenticate': 'Basic realm="' + options.realm + '"'});
    res.write(options.errorContent || '<html><head><title>Access Denied</title></head><body><h1>Access Denied</h1></body></html>');
    res.end();
  }
  return function tinyAuth(req, res, next) {
    if (req.headers['authorization'] && req.headers['authorization'].indexOf('Basic ') === 0) {
      if (options.accounts.indexOf(new Buffer(req.headers['authorization'].split(' ')[1], 'base64').toString()) !== -1) {
        next();
        return;
      }
      else {
        // A timeout makes it slightly harder to brute-force.
        setTimeout(accessDenied.bind(null, res), options.timeout);
      }
    }
    else {
      // Immediate prompt.
      accessDenied(res);
    }
  };
}