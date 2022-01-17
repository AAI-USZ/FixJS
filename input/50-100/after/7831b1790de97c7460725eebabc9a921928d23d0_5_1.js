function(err, tpl) {
      if (err) {
        if (typeof callback === "function") {
          callback(new Error(error("Can't access " + tplfile.red + "\n\n" + err.stack)));
        }
      }
      return typeof callback === "function" ? callback(null, render(tpl.toString(), context)) : void 0;
    }