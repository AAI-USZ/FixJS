function(server, port) {
  var req = path.resolve(process.cwd(), server || 'server');
  port = port || process.env.PORT || 3000;
  var numWorkers = os.cpus().length;

  logger.log('starting cluster with %d workers on port %d', numWorkers, port);
  logger.log('`kill -s SIGUSR2 %d` or ctrl + r' + ' to load new code', process.pid);

  var master = http.createServer().listen(port);
  var srv = up(master, req, {
    numWorkers: numWorkers
  });

  process.on('SIGUSR2', function() {
    logger.log('reloading server..');
    srv.reload();
  });

  if (tty.isatty(0)) {
    process.stdin.resume();
    tty.setRawMode(true);
    process.stdin.on('data', function(b) {
      var key = b.toString('utf8');
      switch (key) {
      case '\u0003':
        // Ctrl+C
        logger.log('ctrl + c detected');
        logger.log('exit');
        process.exit();
        break;
      case '\u0012':
        // Ctrl+R
        logger.log('ctrl + r detected');
        logger.log('reloading server');
        srv.reload();
        break;
      }
    });
  }

  var ignore = ['node_modules', '.git'];
  var include = /\.js$|\.coffee$|\.json$/;

  function ignored(path) {
    return !~ignore.indexOf(path);
  };

  function files(dir, ret) {
    ret = ret || [];
    fs.readdirSync(dir).filter(ignored).forEach(function(p) {
      p = path.join(dir, p);
      if (fs.statSync(p).isDirectory()) {
        files(p, ret);
      } else if (p.match(include)) {
        ret.push(p);
      }
    });
    return ret;
  };

  function watch(files, fn) {
    var events = [];
    files.forEach(function(file) {
      fs.watch(file, function(event, filename) {
        throttle(function() {
          fn(file)
        }, 100);
      });
    });
  };

  var t;

  function throttle(fn, interval) {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(function() {
      clearTimeout(t);
      fn();
    }, interval);
  };

  logger.info('started watching "%s"', process.cwd());

  watch(files(process.cwd()), function(file) {
    logger.info('change detected. reloading server..');
    srv.reload();
  });
}