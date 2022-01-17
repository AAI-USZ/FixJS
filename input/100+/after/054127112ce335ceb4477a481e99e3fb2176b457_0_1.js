function (er) {
    if (er) {
      return log.er(cb, "couldn't unpack "+tgz+" to "+contents)(er)
    }
    fs.readdir(contents, function (er, folder) {
      if (er) return log.er(cb, "couldn't readdir "+contents)(er)
      log.verbose(folder, "tarball contents")
      if (folder.length > 1) {
        folder = folder.filter(function (f) {
          return !f.match(/^\.|^tmp\.tgz$/)
        })
      }
      if (folder.length > 1) {
        log.warn(folder.slice(1).join("\n")
                ,"extra junk in folder, ignoring")
      }
      if (!folder.length) return cb(new Error("Empty package tarball"))
      folder = path.join(contents, folder[0])
      var newName = path.join(contents, "package")
      fs.rename(folder, newName, function (er) {
        if (er) return log.er(cb, "couldn't rename "+folder+" to package")(er)
        addLocalDirectory(newName, name, cb)
      })
    })
  }