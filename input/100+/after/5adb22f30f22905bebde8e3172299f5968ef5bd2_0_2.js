function() {
  app.set('jsonp callback', true);
  app.use(express.methodOverride());

  // Default to text/plain if no content-type was provided.
  app.use(function(req, res, next) {
    if (req.body) { return next(); }
    if ('GET' === req.method || 'HEAD' === req.method) { return next(); }

    if (!req.headers['content-type']) {
      req.body = {};
      textParser(req, null, next);
    } else {
      next();
    }
  });

  app.use(express.bodyParser());

  // Add common headers
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Mime-Type, X-Requested-With, X-File-Name, Content-Type");
    next();
  });
}