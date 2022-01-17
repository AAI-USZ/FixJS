function(req, res, next) {
    if (req.method === 'GET' && req.path === exports.path) {
      function ok(yeah) {
        res.writeHead(yeah ? 200 : 500);
        res.write(yeah ? 'ok' : 'not ok');
        res.end();
      }
      try {
        if (cb) cb(ok);
        else ok(true);
      } catch(e) {
        logger.error("Exception caught in heartbeat handler: " + e.toString());
        ok(false);
      }
    } else {
      return next();
    }
  }