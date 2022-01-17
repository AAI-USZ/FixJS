function (plugin) {
  var pluginPath = path.resolve(pluginDir, plugin + '.js')
  var exists = fs.existsSync(pluginPath)
  if (!exists) {
    var file = path.resolve('plugins', path.basename(pluginPath))
    fs.writeFileSync(pluginPath, fs.readFileSync(file))
  }
}