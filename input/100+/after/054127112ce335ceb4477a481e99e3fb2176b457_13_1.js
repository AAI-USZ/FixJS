function afterUntar (er) {
    log.silly(er || "ok", "afterUntar")
    // if we're not doing ownership management,
    // then we're done now.
    if (er) return log.er(cb, "Failed unpacking "+tarball)(er)

    // HACK skip on windows
    if (npm.config.get("unsafe-perm") && process.platform !== "win32") {
      uid = process.getuid()
      gid = process.getgid()
      if (uid === 0) {
        if (process.env.SUDO_UID) uid = +process.env.SUDO_UID
        if (process.env.SUDO_GID) gid = +process.env.SUDO_GID
      }
    }

    if (process.platform === "win32") {
      return fs.readdir(tmp, function (er, files) {
        files = files.filter(function (f) {
          return f && f.indexOf("\0") === -1
        })
        cb(er, files && path.resolve(tmp, files[0]))
      })
    }

    find(tmp, function (f) {
      return f !== tmp
    }, function (er, files) {
      if (er) return cb(er)
      asyncMap(files, function (f, cb) {
        f = path.resolve(f)
        log.silly(f, "asyncMap in gTP")
        fs.lstat(f, function (er, stat) {

          if (er || stat.isSymbolicLink()) return cb(er)
          if (typeof uid === "number" && typeof gid === "number") {
            fs.chown(f, uid, gid, chown)
          } else chown()

          function chown (er) {
            if (er) return cb(er)
            var mode = stat.isDirectory() ? dMode : fMode
              , oldMode = stat.mode & 0777
              , newMode = (oldMode | mode) & (~npm.modes.umask)
            if (mode && newMode !== oldMode) {
              log.silly(newMode.toString(8), "chmod "+path.basename(f))
              fs.chmod(f, newMode, cb)
            } else cb()
          }
        })
      }, function (er) {

        if (er) return cb(er)
        if (typeof myUid === "number" && typeof myGid === "number") {
          fs.chown(tmp, myUid, myGid, chown)
        } else chown()

        function chown (er) {
          if (er) return cb(er)
          fs.readdir(tmp, function (er, folder) {
            folder = folder && folder.filter(function (f) {
              return f && !f.match(/^\._/)
            })
            cb(er, folder && path.resolve(tmp, folder[0]))
          })
        }
      })
    })
  }