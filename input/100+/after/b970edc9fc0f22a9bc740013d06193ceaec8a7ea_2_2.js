function (dir, cb) {

  var tasks = {},
    self = this;

  function _task(base, file) {
    var baseFile = p.join(base, file);
    tasks[baseFile.substr(baseFile.indexOf('/') + 1)] = function (cb) {
      fs.readFile(baseFile, 'utf8', function (err, result) {
        cb(err, jazz.compile(result));
      });
    };
  }

  f.walkSync(dir, function (base, dirs, files) {
    files.forEach(function (file) {
      if (file.match(new RegExp('\.' + self.ext))) {
        _task(base, file);
      }
    });
  });

  async.parallel(tasks, cb);
}