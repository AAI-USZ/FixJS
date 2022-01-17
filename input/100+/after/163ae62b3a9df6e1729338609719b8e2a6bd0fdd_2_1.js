function(app, options, cb) {
  var dependencies = [];

  if (typeof options == 'function') {
    cb = options;
  } else if (options && options.dependencies) {
    dependencies = options.dependencies;
  }
  var count = dependencies.length;

  app.use(function(req, res, next) {
    if (req.method !== 'GET' || req.path !== exports.path) {
      return next();
    }

    var checked = 0;
    var query = url.parse(req.url, true).query;
    var deep = typeof query.deep != 'undefined';
    var notOk = [];

    // callback for checking a dependency
    function checkCB (num) {
      return function (err, isOk) {
        checked++;
        if (err) {
          notOk.push(dependencies[num] + ': '+ err);
        }

        // if all dependencies have been checked
        if (checked == count) {
          if (notOk.length === 0) {
            try {
              if (cb) cb(ok);
              else ok(true);
            } catch(e) {
              logger.error("Exception caught in heartbeat handler: " + e.toString());
              ok(false, e);
            }
          } else {
            logger.warn("heartbeat failed due to dependencies - " + notOk.join(', '));
            ok(false, '\n' + notOk.join('\n') + '\n');
          }
        }
      };
    }

    function ok(yeah, msg) {
      res.writeHead(yeah ? 200 : 500);
      res.write(yeah ? 'ok' : 'bad');
      if (msg) res.write(msg);
      res.end();
    }

    // check all dependencies if deep
    if (deep && count) {
      for (var i = 0; i < count; i++) {
        check(dependencies[i] + exports.path, checkCB(i));
      }
    } else {
      try {
        if (cb) cb(ok);
        else ok(true);
      } catch(e) {
        logger.error("Exception caught in heartbeat handler: " + e.toString());
        ok(false);
      }
    }
  });
}