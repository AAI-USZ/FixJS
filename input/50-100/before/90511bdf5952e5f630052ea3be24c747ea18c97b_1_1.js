function templates (path) {
  if (templates) return templates
  templates = {}
  fs.readdirSync(path).forEach(function (name) {
    templates[name] = fs.readFileSync(resolve(path, name))
  })

  return templates
}