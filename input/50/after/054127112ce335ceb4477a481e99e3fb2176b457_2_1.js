function (key) {
        log.verbose([key, wrap[key]], "from wrap")
        var w = wrap[key]
        rv.dependencies[key] = w.from || w.version
      }