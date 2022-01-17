function (name) {
    me[name] = fs.readFileSync(resolve(path, name))
  }