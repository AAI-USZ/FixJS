function searchStartScript(dir) {
  var scripts = ['server.js', 'bin/server', 'app.js', 'index.js'];
  for (i in scripts) {
    if (existsSync(path.join(dir, scripts[i]))) {
      return scripts[i];
    }
  }
}