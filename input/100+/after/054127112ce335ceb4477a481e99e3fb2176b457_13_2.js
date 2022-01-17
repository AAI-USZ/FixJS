function gunzTarPerm (tarball, tmp, dMode, fMode, uid, gid, cb) {
  if (!dMode) dMode = npm.modes.exec
  if (!fMode) fMode = npm.modes.file
  log.silly([dMode.toString(8), fMode.toString(8)], "gunzTarPerm modes")

  var fst = fs.createReadStream(tarball)

  fst.on("error", log.er(cb, "error reading "+tarball))
  fst.on("data", function OD (c) {
    // detect what it is.
    // Then, depending on that, we'll figure out whether it's
    // a single-file module, gzipped tarball, or naked tarball.
    // gzipped files all start with 1f8b08
    if (c[0] === 0x1F &&
        c[1] === 0x8B &&
        c[2] === 0x08) {
      var extracter = tar.Extract({ type: "Directory", path: tmp })
      fst
        .pipe(zlib.Unzip())
        .on("error", log.er(cb, "unzip error "+tarball))
        .pipe(tar.Extract({ type: "Directory", path: tmp }))
        .on("error", log.er(cb, "untar error "+tarball))
        .on("close", afterUntar)
    } else if (c.toString().match(/^package\//)) {
      // naked tar
      fst
        .pipe(tar.Extract({ type: "Directory", path: tmp }))
        .on("error", log.er(cb, "untar error "+tarball))
        .on("close", afterUntar)
    } else {
      // naked js file
      fst
        .pipe(fstream.Writer({ path: path.resolve(tmp, "package/index.js") }))
        .on("error", log.er(cb, "copy error "+tarball))
        .on("close", function () {
          var j = path.resolve(tmp, "package/package.json")
          readJson(j, function (er, d) {
            if (er) {
              log.error(tarball, "Not a package")
              return cb(er)
            }
            fs.writeFile(j, JSON.stringify(d) + "\n", function (er) {
              if (er) return cb(er)
              return afterUntar()
            })
          })
        })
    }

    // now un-hook, and re-emit the chunk
    fst.removeListener("data", OD)
    fst.emit("data", c)
  })

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
}