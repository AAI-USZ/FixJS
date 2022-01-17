function(dir) {
  if (!pathlib.existsSync(dir)) return fs.mkdirSync(dir);
}