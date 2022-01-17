function (done) {
    registry = new Registry()
  	loader = new ModuleLoader(registry)
    loader.dirs.push(path.join(__dirname, 'modules'))

    loader.load().then(function () {
      done()
    }).end()
  }