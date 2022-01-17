function (er) {
      if (er) return cb(er)
      tar.unpack( path.join(npm.cache, pkg, ver, "package.tgz")
                , unpackTarget
                , dMode, fMode
                , uid, gid
                , cb )
    }