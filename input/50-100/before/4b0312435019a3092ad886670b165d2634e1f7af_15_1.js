function(err) {
        if (err) {
          return puts(error("" + ("Can't write " + path).red + "\n\n" + err.stack)) && (typeof cb === "function" ? cb() : void 0);
        }
        puts(("" + dir + "/" + name + ".gen.coffee generated").green);
        return typeof cb === "function" ? cb() : void 0;
      }