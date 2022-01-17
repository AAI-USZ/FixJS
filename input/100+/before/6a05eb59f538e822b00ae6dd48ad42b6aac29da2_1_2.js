function(cb) {
    var path = this;
    if (this.isNodeModule) {
      var dir = pathLib.join(process.cwd(), "node_modules", this.path);
      var packagePath = pathLib.join(dir, "package.json");
      var package;
      if (pathLib.existsSync(packagePath)) {
        package = JSON.parse(fs.readFileSync(packagePath));
      } else {
        package = {};
      }
      var main = package.main || "./index";
      var fullDepPath = pathLib.join(dir, main);
      var depPath = pathLib.relative(process.cwd(), fullDepPath);

      var out = "module.exports = require('" + depPath + "');";
      cb(null, out);
    }
    else {
      fs.readFile(withAutoSuffix(path.path), function(err, data) {
        if(err) { return cb(err); }
        var compiler = path.compiler();
        compiler(data.toString(), cb);
      });
    }
  }