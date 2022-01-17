function () {
        var dir = appDir + '/modules'
        return path.existsSync(dir) ? fs.readdirSync(dir) : []
      }