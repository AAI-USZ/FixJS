function() {
    var a, args, cb, generator, name, _i;
    generator = arguments[0], name = arguments[1], args = 4 <= arguments.length ? __slice.call(arguments, 2, _i = arguments.length - 1) : (_i = 2, []), cb = arguments[_i++];
    if (Neat.root == null) {
      return puts(notOutsideNeat("neat generate initializer"));
    }
    if (name == null) {
      return puts(error("Missing name argument"));
    }
    a = name.split('/');
    name = a.pop();
    return render(__filename, {
      name: name
    }, function(err, data) {
      var dir, path;
      if (err != null) {
        return "" + (missing("Template for " + __filename)) + "\n\n" + err.stack;
      }
      dir = resolve(Neat.root, "src/config/initializers/" + (a.join('/')));
      ensurePathSync(dir);
      path = resolve(dir, "" + name + ".coffee");
      return fs.writeFile(path, data, function(err) {
        if (err) {
          return puts(error("" + ("Can't write " + path).red + "\n\n" + err.stack)) && (typeof cb === "function" ? cb() : void 0);
        }
        puts(("" + dir + "/" + name + ".coffee generated").green);
        return typeof cb === "function" ? cb() : void 0;
      });
    });
  }