function(req, res, next) {
    var headers;
    headers = {
      'Cache-Control': 'max-age:120'
    };
    if (!_.isUndefined(req.headers.origin)) {
      headers = _.extend(headers, {
        'Access-Control-Allow-Origin': req.headers.origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER',
        'Access-Control-Max-Age': 86400
      });
    }
    _.each(headers, function(value, key) {
      return res.setHeader(key, value);
    });
    return next();
  }