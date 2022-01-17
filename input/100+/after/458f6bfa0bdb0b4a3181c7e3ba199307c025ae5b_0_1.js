function (p) {
  if (!p) {
    throw new TypeError('Missing path');
  }
  if (support.has(p)) {
    return new Module({
      path    : support.folder,
      script  : support.folder + '/' + p + '.js',
      name    : p
    });
  }
  if (!fs.existsSync(p)) {
    throw new Error('File not found: ' + p);
  }
  var config  = {};
  var stat    = fs.statSync(p);
  if (stat.isDirectory()) {
    config.script = p + '/index.js';
    if (!fs.existsSync(config.script)) {
      var pkg = readPackageJson(p);
      config.script = path.join(p, pkg.main);
      if(config.script.indexOf('.js') === -1) {
        config.script += ".js";
      }
      if (!fs.existsSync(config.script)) {
        throw new Error('Main from package.json in ' + p + ' not found: ' +
          config.script);
      }
      config.nomo = pkg.nomo;
      config.pkg  = pkg;
    }
  } else {
    config.script = p;
  }
  config.path = path.dirname(config.script);
  config.name = config.script.substring(0, config.script.length - 3);
  return new Module(config);
}