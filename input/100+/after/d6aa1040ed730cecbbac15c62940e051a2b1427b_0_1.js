function (name, opts, cb) {
  if (!cb) {cb = opts; opts = {}}
  if (!opts.ignore) {opts.ignore = []}
  if (!opts.dir) {opts.dir = cwd}

  var ignoreDirs = opts.ignore
    , startDir = opts.dir
    ;

  walker = walk.walk(startDir);
  walker.on('directories', function (root, dirs, next) {
    dirs.forEach(function (dir) {
      ignoreDirs.forEach(function (ignoreDir, idx) {
        if (root.indexOf(ignoreDir) > -1) {
          next()
        } else if (dir.name == name) {
          cb(path.join(root, name))
          walker.removeAllListeners()
        }
      })
    })
    next()
  })
}