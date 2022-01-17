function (domain, delegates, cb) {
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
  };

  if (g_shim_cache[domain]) {
    return cb(null, g_shim_cache[domain].body, domain, delegates);
  }

  // now we need to check to see if domain purports to being a primary
  // for browserid
  var httpProxy = config.has('http_proxy') ? config.get('http_proxy') : null;

  var req;
  if (httpProxy && httpProxy.port && httpProxy.host) {
    // In production we use Squid as a reverse proxy cache to reduce how often
    // we request this resource.
    req = http.get({
      host: httpProxy.host,
      port: httpProxy.port,
      path: 'https://' + domain + WELL_KNOWN_URL,
      headers: {
        host: domain
      }
    }, handleResponse);
  } else {
    req = https.get({
      host: domain,
      path: WELL_KNOWN_URL,
      agent: false
    }, handleResponse);
  }

  req.on('error', function(e) {
    logger.debug(domain + ' is not a browserid primary: ' + e.toString());
    cb(null, false, null);
  });
}