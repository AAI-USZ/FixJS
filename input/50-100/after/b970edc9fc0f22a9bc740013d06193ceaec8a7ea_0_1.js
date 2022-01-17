function _pages(cb) {

    var _engine = new engine('html'),
      tasks = {};

    ['partials', 'layouts', 'pages'].forEach(function (dir) {
      tasks[dir] = function (cb) {
        _engine.compile(dir, cb);
      }
    });

    async.parallel(tasks, function (err, results) {
      _engine.merge('out', results, _params(), cb);
    });
  }