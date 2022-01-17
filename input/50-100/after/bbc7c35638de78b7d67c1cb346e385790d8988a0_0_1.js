function collectSourceFilesInDir(sources, dirPath) {
  fs.readdirSync(dirPath).forEach(function (name) {
    var path = dirPath + '/' + name;
    var pathInfo = fs.statSync(path);
    if (pathInfo.isDirectory())
      collectSourceFilesInDir(sources, path);
    else if (pathInfo.isFile() && name.match(/.+\.js$/))
      sources.push(path);
  });
}