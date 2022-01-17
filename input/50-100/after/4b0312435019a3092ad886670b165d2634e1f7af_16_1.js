function(err) {
        if (err) {
          return error("" + ("Can't write " + path).red + "\n\n" + err.stack) && (typeof cb === "function" ? cb() : void 0);
        }
        info(("" + dir + "/" + name + ".coffee generated").green);
        return typeof cb === "function" ? cb() : void 0;
      }