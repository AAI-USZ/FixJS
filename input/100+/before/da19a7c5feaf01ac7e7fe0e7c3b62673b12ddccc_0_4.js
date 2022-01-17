function buildThorax(info, next) {
  fs.writeFile(info.target, info.sources.map(function(source) {
    return fs.readFileSync(path.join(__dirname, '..', source));
  }).join("\n"), next);
}