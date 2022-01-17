function static(req, res, next) {
    if ('GET' != req.method && 'HEAD' != req.method) return next();
    var path = parse(req).pathname;

    function directory() {
      if (!redirect) return next();
      var pathname = url.parse(req.originalUrl).pathname;
      res.statusCode = 301;
      res.setHeader('Location', pathname + '/');
      res.end('Redirecting to ' + utils.escape(pathname) + '/');
    }

    send(req, path)
      .maxage(options.maxAge || 0)
      .root(options.root)
      .hidden(options.hidden)
      .on('error', next)
      .on('directory', directory)
      .pipe(res);
  }