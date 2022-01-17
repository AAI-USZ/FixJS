function (ignoreDir, idx) {
        if (root.indexOf(ignoreDir) > -1) {
          next()
        } else if (dir.name == name) {
          cb(path.join(root, name))
          walker.removeAllListeners()
        }
      }