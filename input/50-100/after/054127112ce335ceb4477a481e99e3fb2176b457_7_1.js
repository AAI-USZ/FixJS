function (er, files) {
    // an error right away is a bad sign.
    if (er && p === original) return cb(er)

    // walked up too high or something.
    if (er) return cb(null, original)

    if (files.indexOf("node_modules") !== -1
        || files.indexOf("package.json") !== -1) {
      return cb(null, p)
    }

    var d = path.dirname(p)
    if (d === p) return cb(null, original)

    return findPrefix_(d, original, cb)
  }