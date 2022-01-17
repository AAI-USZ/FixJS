function(dir) {
  var stat;
  return fs.existsSync(dir) && (stat = fs.statSync(dir)) &&
         stat.isDirectory();
}