function write (target, targetFolder, context, cb_) {
  var up = npm.config.get("unsafe-perm")
    , user = up ? null : npm.config.get("user")
    , group = up ? null : npm.config.get("group")
    , family = context.family

  function cb (er, data) {
    // cache.unpack returns the data object, and all we care about
    // is the list of installed packages from that last thing.
    if (!er) return cb_(er, data)
    log.error(target._id,"error installing")
    if (false === npm.config.get("rollback")) return cb_(er)
    npm.commands.unbuild([targetFolder], function (er2) {
      if (er2) log.error(er2, "error rolling back "+target._id)
      return cb_(er, data)
    })
  }

  chain
    ( [ [ cache.unpack, target.name, target.version, targetFolder
        , null, null, user, group ]
      , [ fs, "writeFile"
        , path.resolve(targetFolder, "package.json")
        , JSON.stringify(target, null, 2) + "\n" ]
      , [ lifecycle, target, "preinstall", targetFolder ] ]

    // nest the chain so that we can throw away the results returned
    // up until this point, since we really don't care about it.
    , function (er) {
      if (er) return cb(er)

      // before continuing to installing dependencies, check for a shrinkwrap.
      readDependencies(context, targetFolder, {}, function (er, data, wrap) {
        var deps = Object.keys(data.dependencies || {})
        var newcontext = { family: family
                         , ancestors: context.ancestors
                         , parent: target
                         , explicit: false
                         , wrap: wrap }
        installMany(deps.filter(function (d) {
          // prefer to not install things that are satisfied by
          // something in the "family" list, unless we're installing
          // from a shrinkwrap.
          return wrap || !semver.satisfies(family[d], data.dependencies[d])
        }).map(function (d) {
          var t = data.dependencies[d]
            , parsed = url.parse(t.replace(/^git\+/, "git"))
          t = d + "@" + t
          return t
        }), targetFolder, newcontext, function (er, d) {
            log.verbose(targetFolder, "about to build")
            if (er) return cb(er)
            npm.commands.build( [targetFolder]
                              , npm.config.get("global")
                              , true
                              , function (er) { return cb(er, d) })
        })
      })
    })
}