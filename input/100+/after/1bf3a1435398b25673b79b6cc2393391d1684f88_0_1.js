function next (er) {
    if (errState) return
    if (er) return cb(errState = er, [], cleanup)
    if (-- n > 0) return

    if (!pkg) return cb(new Error("No package.json file in "+dir))
    if (pkg.path === dir && pkg.files) {
      pkg.files = pkg.files.filter(function (f) {
        f = f.trim()
        return f && f.charAt(0) !== "#"
      })
      if (!pkg.files.length) pkg.files = null
    }
    if (pkg.path === dir && pkg.files) {
      // stuff on the files list MUST be there.
      // ignore everything, then include the stuff on the files list.
      var pkgFiles = ["*"].concat(pkg.files.map(function (f) {
        return "!" + f
      }))
      pkgFiles.dir = dir
      pkgFiles.packageFiles = true
      exList.push(pkgFiles)
    }

    if (path.basename(dir) === "node_modules"
        && pkg.path === path.dirname(dir)
        // do fancy crap
        && dfc
        // not already part of a bundled dependency
        && (path.basename(path.dirname(pkg.path)) !== "node_modules"
          // unless it's the root
          || pkg.path === npm.prefix)) {
      log.verbose(dir, "doing fancy crap")
      files = filterNodeModules(files, pkg)
    } else {
      // If a directory is excluded, we still need to be
      // able to *include* a file within it, and have that override
      // the prior exclusion.
      //
      // This whole makeList thing probably needs to be rewritten
      files = files.filter(function (f) {
        return excludes.filter(dir, exList)(f) || f.slice(-1) === "/"
      })
    }


    asyncMap(files, function (file, cb) {
      // if this is a dir, then dive into it.
      // otherwise, don't.
      file = path.resolve(dir, file)

      // in 0.6.0, fs.readdir can produce some really odd results.
      // XXX: remove this and make the engines hash exclude 0.6.0
      if (file.indexOf(dir) !== 0) {
        return cb(null, [])
      }

      fs.lstat(file, function (er, st) {
        if (er) return cb(er)
        if (st.isDirectory()) {
          return makeList_(file, pkg, exList, dfc, cb)
        }
        return cb(null, file)
      })
    }, function (er, files, c) {
      if (c) cleanup = (cleanup || []).concat(c)
      if (files.length > 0) files.push(dir)
      return cb(er, files, cleanup)
    })
  }