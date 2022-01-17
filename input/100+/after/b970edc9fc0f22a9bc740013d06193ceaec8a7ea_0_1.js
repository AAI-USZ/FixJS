function (cb) {

  console.log('Generating website');

  function _params() {

    // initial userland params
    // NOTE: require is only done once for the duration of the process
    // TODO: find require everytime, not just once
    var params = require(p.join(process.cwd(), 'params')).params;
console.log(">>" + require('util').inspect(params));
    // set defaults
    params.sitemap = params.sitemap || {};
    params.__genId = dateformat('yyyymmddHHMMssLl');

    return params;
  }

  function _static(cb) {
    // copy static files as-is
    ncp.ncp('static', 'out', cb);
  }

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

  async.parallel([_static, _pages], cb);
}