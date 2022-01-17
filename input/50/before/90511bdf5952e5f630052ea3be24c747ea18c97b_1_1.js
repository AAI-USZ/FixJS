function (name) {
    templates[name] = fs.readFileSync(resolve(path, name))
  }