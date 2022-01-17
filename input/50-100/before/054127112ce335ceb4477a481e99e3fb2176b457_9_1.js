function (orig, name, i, s) {
    return process.env[name] || orig
  }