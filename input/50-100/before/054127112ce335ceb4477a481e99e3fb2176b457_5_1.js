function (er, files) {
      // everything should be a dir.
      if (er) return cb(er)
      if (files.indexOf("wscript") !== -1) {
        exec("node-waf", ["clean"], null, false, f, thenBuild)
      } else if (files.indexOf("Makefile") !== -1) {
        exec("make", ["clean"], null, false, f, thenBuild)
      } else thenBuild()
    }