function (dir) {
      if (!isIgnored(root, ignoreDirs) && dir.name == name) {
        walker.removeAllListeners()
        cb(path.join(root, name))
      }
    }