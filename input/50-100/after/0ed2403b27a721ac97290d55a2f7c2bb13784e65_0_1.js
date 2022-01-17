function findFile(paths, file) {
    for (var i = 0; i < paths.length; i++) {
      var filePath = path.resolve(paths[i], file)
      if (fs.existsSync(filePath)) {
        return filePath
      }
    }
    return null
  }