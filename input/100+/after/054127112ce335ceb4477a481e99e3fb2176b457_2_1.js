function save (where, installed, tree, pretty, cb) {
  if (!npm.config.get("save") || npm.config.get("global")) {
    return cb(null, installed, tree, pretty)
  }

  // each item in the tree is a top-level thing that should be saved
  // to the package.json file.
  // The relevant tree shape is { <folder>: {what:<pkg>} }
  var saveTarget = path.resolve(where, "package.json")
    , things = Object.keys(tree).map(function (k) {
        // if "what" was a url, then save that instead.
        var t = tree[k]
          , u = url.parse(t.from)
          , w = t.what.split("@")
        if (u && u.protocol) w[1] = t.from
        return w
      }).reduce(function (set, k) {
        var rangeDescriptor = semver.valid(k[1]) &&
                              semver.gte(k[1], "0.1.0")
                            ? "~" : ""
        set[k[0]] = rangeDescriptor + k[1]
        return set
      }, {})

  // don't use readJson, because we don't want to do all the other
  // tricky npm-specific stuff that's in there.
  fs.readFile(saveTarget, function (er, data) {
    // ignore errors here, just don't save it.
    try {
      data = JSON.parse(data.toString("utf8"))
    } catch (ex) {
      er = ex
    }
    if (er) return cb(null, installed, tree, pretty)

    var deps = npm.config.get("dev") ? "devDependencies" : "dependencies"
    deps = data[deps] = data[deps] || {}

    Object.keys(things).forEach(function (t) {
      deps[t] = things[t]
    })
    data = JSON.stringify(data, null, 2) + "\n"
    fs.writeFile(saveTarget, data, function (er) {
      cb(er, installed, tree, pretty)
    })
  })
}