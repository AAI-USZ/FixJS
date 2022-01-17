function (req, res) {
  var uri, r, handler;

  res.send = function (status, contentType, body) {
    res.writeHead(status, { 'Content-Type': contentType });
    res.end(body);
  };

  res.json = function (status, obj) {
    if (typeof status !== 'number' && !obj) {
      obj = status;
      status = 200;
    }
    var body = obj ? JSON.stringify(typeof obj === 'string' ? { cause: obj } : obj) : '{}';
    res.send(status, 'application/json', body);
  };

  res.badRequest = function(obj) {
    res.json(400, obj);
  };

  console.log(req.url, req.method);

  uri = url.parse(req.url, true);
  r = router.route(req.method, uri.pathname);
  if (r) {
    req.param = function (key) {
      return r.params[key] ? r.params[key] : uri.query[key];
    }

    req.pathname = uri.pathname;
    debug('Request path: %s', req.pathname);

    handler = r.value;
    if (typeof handler === 'function') {
      try {
        handler(req, res, r.params);
      } catch (e) {
        res.json(500, { resonse: 'Unexpected error', url: req.url });
      }
    } else if (typeof handler === 'string') {
      res.send(200, 'text/plain', handler);
    } else {
      res.json(200, handler);
    }
  } else {
    res.json(404, { reason: 'This not the URL you are looking for', url: req.url });
  }
}