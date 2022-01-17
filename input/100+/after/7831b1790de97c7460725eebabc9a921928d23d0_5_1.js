function(file, context, callback) {
    var a, engines, ext, k, tplfile, v, _ref2;
    a = [];
    tplfile = findSiblingFile(file, Neat.paths, "templates", "*", a);
    if (typeof context === 'function') {
      _ref2 = [{}, context], context = _ref2[0], callback = _ref2[1];
    }
    if (tplfile == null) {
      if (typeof callback === "function") {
        callback(new Error("" + (missing(tplfile)) + "\n\nExplored paths:\n" + (a.join("\n"))));
      }
    }
    puts("template found: " + tplfile.yellow);
    ext = extname(tplfile).slice(1);
    engines = Neat.env.engines.templates;
    for (k in engines) {
      v = engines[k];
      if (ext === k) {
        render = v.render;
      }
    }
    if (render == null) {
      if (typeof callback === "function") {
        callback(new Error("" + (missing("" + ext + " template backend"))));
      }
    }
    puts("engine found for " + ext.cyan);
    return fs.readFile(tplfile, function(err, tpl) {
      if (err) {
        if (typeof callback === "function") {
          callback(new Error(error("Can't access " + tplfile.red + "\n\n" + err.stack)));
        }
      }
      return typeof callback === "function" ? callback(null, render(tpl.toString(), context)) : void 0;
    });
  }