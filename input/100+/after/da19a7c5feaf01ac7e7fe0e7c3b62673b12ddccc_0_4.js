function buildConcatBuilds(builds, next) {
  async.forEachSeries(_.map(builds, function(build, key) {
    return build;
  }), function(item, next) {
    var targetPath = path.join(__dirname, '..', item.target),
        targetDir = path.dirname(targetPath);
    function writeFile() {
      console.log('wrote', targetPath);
      fs.writeFile(targetPath, item.sources.map(function(source) {
        return fs.readFileSync(path.join(__dirname, '..', source));
      }).join("\n"), next);
    }
    if (!path.existsSync(targetDir)) {
      mkdirp(targetDir, writeFile);
    } else {
      writeFile();
    }
  }, next);
}