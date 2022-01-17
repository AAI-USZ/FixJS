function searchStartScript(dir) {
  var scripts = ['server.js', 'bin/server', 'app.js', 'index.js'];
  for (i in scripts) {
    if (path.existsSync(path.join(dir, scripts[i]))) {
      return scripts[i];
    }
  }
}