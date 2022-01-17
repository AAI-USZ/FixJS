function(err, data) {
      var dir, path;
      if (err != null) {
        return error("" + (missing("Template for " + __filename)) + "\n\n" + err.stack);
      }
      dir = resolve(Neat.root, "src/generators/" + (a.join('/')));
      ensurePathSync(dir);
      path = resolve(dir, "" + name + ".gen.coffee");
      return fs.writeFile(path, data, function(err) {
        if (err) {
          return error("" + ("Can't write " + path).red + "\n\n" + err.stack) && (typeof cb === "function" ? cb() : void 0);
        }
        info(("" + dir + "/" + name + ".gen.coffee generated").green);
        return typeof cb === "function" ? cb() : void 0;
      });
    }