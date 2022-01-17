function handleResponse(res) {
    if (res.statusCode !== 200) {
      logger.debug(domain + ' is not a browserid primary - non-200 response code to ' + WELL_KNOWN_URL);
      return cb(null, false, null);
    }
    if (res.headers['content-type'].indexOf('application/json') !== 0) {
      logger.debug(domain + ' is not a browserid primary - non "application/json" response to ' + WELL_KNOWN_URL);
      return cb(null, false, null);
    }

    var body = "";
    res.on('data', function(chunk) { body += chunk; });
    res.on('end', function() {
      cb(null, body, domain, delegates);
    });
  }