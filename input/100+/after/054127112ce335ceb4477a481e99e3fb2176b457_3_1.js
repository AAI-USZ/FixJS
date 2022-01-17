function getLite (data, noname) {
  var lite = {}
    , maxDepth = npm.config.get("depth")
    , url = require("url")

  if (!noname && data.name) lite.name = data.name
  if (data.version) lite.version = data.version
  if (data.extraneous) {
    lite.extraneous = true
    lite.problems = lite.problems || []
    lite.problems.push( "extraneous: "
                      + data.name + "@" + data.version
                      + " " + (data.path || "") )
  }

  if (data._from) {
    var from = data._from
    if (from.indexOf(data.name + "@") === 0) {
      from = from.substr(data.name.length + 1)
    }
    var u = url.parse(from)
    if (u.protocol) lite.from = from
  }

  if (data.invalid) {
    lite.invalid = true
    lite.problems = lite.problems || []
    lite.problems.push( "invalid: "
                      + data.name + "@" + data.version
                      + " " + (data.path || "") )
  }

  if (data.dependencies) {
    var deps = Object.keys(data.dependencies)
    if (deps.length) lite.dependencies = deps.map(function (d) {
      var dep = data.dependencies[d]
      if (typeof dep === "string") {
        lite.problems = lite.problems || []
        var p
        if (data.depth >= maxDepth) {
          p = "max depth reached: "
        } else {
          p = "missing: "
        }
        p += d + "@" + dep
          + ", required by "
          + data.name + "@" + data.version
        lite.problems.push(p)
        return [d, { required: dep, missing: true }]
      }
      return [d, getLite(dep, true)]
    }).reduce(function (deps, d) {
      if (d[1].problems) {
        lite.problems = lite.problems || []
        lite.problems.push.apply(lite.problems, d[1].problems)
      }
      deps[d[0]] = d[1]
      return deps
    }, {})
  }
  return lite
}