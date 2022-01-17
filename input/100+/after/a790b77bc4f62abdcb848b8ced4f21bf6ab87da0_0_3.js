function Dependencies(piccolo, callback) {
  if (!(this instanceof Dependencies)) return new Dependencies(piccolo, callback);

  var self = this;

  // save piccolo object
  this.piccolo = piccolo;

  // get module path
  var modulePath = piccolo.get('modules');

  // This map will contain all resolved dependencies
  this.cache = {
    dependencies: {},
    resolved: {},
    dirMap: [],
    stats: {}
  };

  // This map will contain the build dependencies tree
  this.build = {
    dependencies: {},
    mtime: {}
  };

  var options = {
    source: modulePath,
    cache: path.join(piccolo.get('temp'), 'modules'),
    state: path.join(piccolo.get('temp'), 'modules.state.json')
  };

  var compiler = leaflet(options, function (error) {
    if (error) return callback(error, null);

    // execute callback when all files are compiled
    self.updateCache(function (error) {
      callback(error, self);
    });
  });

  // strip BOM
  compiler.handle('js', 'string', function (content, next) {
    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFileSync()`
    // translates it to FEFF, the UTF-16 BOM.
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    next(content);
  });

  // match all require
  compiler.handle('js', 'string', function (content, next, file) {
    var list = self.resolveSource(content);
    var exec = self.resolveModule.bind(self, file.path);

    async.map(list, exec, function (error, list) {
      if (error) return next(error);

      self.cache.dependencies['/' + file.path] = list;
      self.cache.stats['/' + file.path] = file.mtime;

      next(content);
    });
  });

  // escape source code so it match the JSON syntax
  compiler.handle(['js', 'json'], 'string', function (content, next) {
    next( JSON.stringify(content) );
  });

  if (piccolo.get('compress')) {
    var jsp = uglify.parser;
    var pro = uglify.uglify;

    compiler.handle('js', 'string', function (content, next) {
      var ast = jsp.parse(content);
          ast = pro.ast_mangle(ast);
          ast = pro.ast_squeeze(ast);

      next(pro.gen_code(ast));
    });

    compiler.handle('json', 'string', function (content, next) {
      next( JSON.stringify(JSON.parse(content)) );
    });
  }

  // export the leaflet compiler
  this.compiler = compiler;
}