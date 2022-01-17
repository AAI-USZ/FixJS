function (er, data) {
    if (er) {
      log.error("Could not read data for "+pkg+"@"+ver)
      return cb(er)
    }
    tar.unpack( path.join(npm.cache, pkg, ver, "package.tgz")
             , unpackTarget
             , dMode, fMode
             , uid, gid
             , cb )
  }