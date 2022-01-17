function (key) {
        var w = newwrap.dependencies[key]
        rv.dependencies[key] = w.from || w.version
      }