function(file, context) {
    var a, engines, ext, k, tpl, tplfile, v;
    a = [];
    tplfile = findSiblingFile(file, Neat.paths, "templates", "*", a);
    if (tplfile == null) {
      throw new Error("" + (missing(tplfile)) + "\n\nExplored paths:\n" + (a.join("\n")));
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
      throw new Error("" + (missing("" + ext + " template backend")));
    }
    puts("engine found for " + ext.cyan);
    try {
      tpl = fs.readFileSync(tplfile);
    } catch (e) {
      e.message = error("Can't access " + tplfile.red + "\n" + e.message);
      throw e;
    }
    return render(tpl.toString(), context);
  }