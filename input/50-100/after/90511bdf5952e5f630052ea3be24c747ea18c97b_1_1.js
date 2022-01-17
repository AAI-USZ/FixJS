function templates (path) {
  if (me) return me

  me = {}
  fs.readdirSync(path).forEach(function (name) {
    me[name] = fs.readFileSync(resolve(path, name))
  })

  return me
}