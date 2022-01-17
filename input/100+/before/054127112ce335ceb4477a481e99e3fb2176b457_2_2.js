function resolver (what, cb) {
    if (!alreadyInstalledManually) return setTimeout(function () {
      resolver(what, cb)
    }, to++)
    // now we know what's been installed here manually,
    // or tampered with in some way that npm doesn't want to overwrite.
    if (alreadyInstalledManually.indexOf(what.split("@").shift()) !== -1) {
      log.verbose("skipping "+what, "already installed in "+where)
      return cb(null, [])
    }

    // check for a version installed higher in the tree.
    // If installing from a shrinkwrap, it must match exactly.
    if (context.family[what]) {
      if (wrap && wrap[what].version == context.family[what]) {
        log.verbose("using existing "+what+" (matches shrinkwrap)")
        return cb(null, [])
      }

      if (!wrap && semver.satisfies(context.family[what], deps[what] || "")) {
        log.verbose("using existing "+what+" (no shrinkwrap)")
        return cb(null, [])
      }
    }

    if (wrap) {
      name = what.split(/@/).shift()
      if (wrap[name]) {
        log.verbose("shrinkwrap: resolving "+what+" to "+wrap[name].version)
        what = name + "@" + wrap[name].version
      } else {
        log.verbose("shrinkwrap: skipping "+what+" (not in shrinkwrap)")
      }
    } else if (deps[what]) {
      what = what + "@" + deps[what]
    }

    cache.add(what, function (er, data) {
      if (er && parent && parent.optionalDependencies &&
          parent.optionalDependencies.hasOwnProperty(what.split("@").shift())) {
        log.warn(what, "optional dependency failed, continuing")
        return cb(null, [])
      }
      if (!er && data && context.family[data.name] === data.version) {
        return cb(null, [])
      }
      return cb(er, data)
    })
  }