function(f1, f2) {
  var file, files, stats, _i, _len, _results;
  files = fs.readdirSync(f1);
  _results = [];
  for (_i = 0, _len = files.length; _i < _len; _i++) {
    file = files[_i];
    stats = fs.lstatSync("" + f1 + "/" + file);
    if (stats.isDirectory()) {
      _results.push(merge("" + f1 + "/" + file, "" + f2 + "/" + file));
    } else {
      if (!fs.existsSync("" + f2 + "/" + file)) {
        fs.mkdirSync(("" + f2 + "/" + file).split("/").slice(0, -1).join("/"), 0x1ed, true);
        fs.writeFileSync("" + f2 + "/" + file, fs.readFileSync("" + f1 + "/" + file));
        _results.push(console.log("Merged " + f2 + "/" + file + "."));
      } else {
        _results.push(console.log("Cannot merge " + f2 + "/" + file + ". File exists."));
      }
    }
  }
  return _results;
}