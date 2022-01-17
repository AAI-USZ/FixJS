function cleanBuild (folders, set, cb) {
  // https://github.com/isaacs/npm/issues/1872
  // If there's a wscript, try 'node-waf clean'
  // But don't die on either of those if they fail.
  // Just a best-effort kind of deal.
  asyncMap(folders, function (f, cb) {
    fs.readdir(f, function (er, files) {
      // everything should be a dir.
      if (er) return cb(er)
      if (files.indexOf("wscript") !== -1) {
        exec("node-waf", ["clean"], null, false, f, thenBuild)
      } else thenBuild()
    })
    function thenBuild (er) {
      // ignore error, just continue
      // it could be that it's not configured yet or whatever.
      cb()
    }
  }, function (er) {
    if (er) return cb(er)
    npm.commands.build(folders, function (er) {
      if (er) return cb(er)
      output.write(folders.map(function (f) {
        return set[f] + " " + f
      }).join("\n"), cb)
    })
  })
}