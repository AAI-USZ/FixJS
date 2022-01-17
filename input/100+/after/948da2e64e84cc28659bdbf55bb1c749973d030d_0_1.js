function(files, settings) {

  var app = tako();

  var mochaCorePath = path.resolve( path.dirname(require.resolve('mocha')), 'mocha.js');
  app.route('/file/mocha.js').file(mochaCorePath);

  var mochaStylePath = path.resolve( path.dirname(require.resolve('mocha')), 'mocha.css');
  app.route('/file/mocha.css').file(mochaStylePath);

  var chaiPath = path.resolve( path.dirname(require.resolve('chai')), 'chai.js');
  app.route('/file/chai.js').file(chaiPath);

  // find the shared dirname
  var root = path.dirname(files[0]), i, l;
  for (i = 1, l = files.length; i < l; i++) {
    var testDir = path.dirname(files[i]);

    while (root !== testDir) {
      root = path.dirname(root);
      testDir = path.dirname(testDir);
    }
  }

  // create pathmap
  var map = {};
  for (i = 0, l = files.length; i < l; i++) {
    map[ files[i].slice(root.length) ] = files[i];
  }

  // route all static test files
  Object.keys(map).forEach(function (relative) {
    app.route('/test' + relative).file(map[relative]);
  });

  // Standart output
  var base = preGenerate(settings.index, settings.style);

  //Generate pages
  var indexFile = generateIndex(base, map);
  app.route('/').html(indexFile);

  // route all subtest pages
  Object.keys(map).forEach(function (relative) {
    var content = generateTest(base, relative);
    app.route(relative).html(content);
  });

  // route static requests
  var staticRoot = path.dirname(settings.index);
  app.route('/static', function (req, res) {
    // yes, this so unsafe that it is hard to understand
    // but wtf, it is just a testsuite
    req.pipe( filed(path.resolve(staticRoot, req.qs.src)) ).pipe(res);
  });

  app.httpServer.listen(settings.port, settings.address, function () {
    var addr = app.httpServer.address();
    console.log('blow server online at http://' + addr.address + ':' + addr.port);
  });
}