function () {
  var plugin_dir = this.plugin_dir;
  if (!plugin_dir || !path.existsSync(plugin_dir)) {
    return [];
  }

  var filenames = fs.readdirSync(plugin_dir).filter(function (filename) {
    return require.extensions[path.extname(filename)];
  });

  var plugins = filenames.map(function (filename) {
    var plugin_path = path.join(plugin_dir, filename);
    var plugin = require(plugin_path);
    return plugin.handler;
  });

  return plugins;
}