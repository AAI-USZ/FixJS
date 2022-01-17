function tinyAuth(req, res, next) {
    if (req.headers['authorization'] && req.headers['authorization'].indexOf('Basic ') === 0) {
      if (options.accounts.indexOf(new Buffer(req.headers['authorization'].split(' ')[1], 'base64').toString()) !== -1) {
        next();
        return;
      }
    }

    res.writeHead(401, {'WWW-Authenticate': 'Basic realm="' + options.realm + '"'});
    res.end();
  }