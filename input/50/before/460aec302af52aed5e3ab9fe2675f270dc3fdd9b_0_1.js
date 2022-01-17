function(dir) {
  var stat;
  return path.existsSync(dir) && (stat = fs.statSync(dir)) &&
         stat.isDirectory();
}