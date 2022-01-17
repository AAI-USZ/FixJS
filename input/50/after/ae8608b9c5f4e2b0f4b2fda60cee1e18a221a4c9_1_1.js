function () {
        var dir = appDir + '/modules'
        return existsSync(dir) ? fs.readdirSync(dir) : []
      }