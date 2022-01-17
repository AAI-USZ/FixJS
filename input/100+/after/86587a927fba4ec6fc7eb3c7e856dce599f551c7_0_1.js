function checkEngine (target, cb) {
  var npmv = npm.version
    , force = npm.config.get("force")
    , nodev = force ? null : npm.config.get("node-version")
    , strict = npm.config.get("engine-strict") || target.engineStrict
    , eng = target.engines
  if (!eng) return cb()
  if (nodev && eng.node && !semver.satisfies(nodev, eng.node)
      || eng.npm && !semver.satisfies(npmv, eng.npm)) {
    if (strict) {
      var er = new Error("Unsupported node version " + nodev
               + " (required: " + eng.node
               + ") or npm version " + npmv
               + " (required: " + eng.npm + ")")
      er.code = "ENOTSUP"
      er.required = eng
      er.pkgid = target._id
      return cb(er)
    } else {
      log.warn( "engine", "%s: wanted: %j (current: %j)"
              , target._id, eng, {node: nodev, npm: npm.version} )
    }
  }
  return cb()
}