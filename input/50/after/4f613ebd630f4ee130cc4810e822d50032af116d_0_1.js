function(dir) {
  if (!existslib.existsSync(dir)) return fs.mkdirSync(dir);
}