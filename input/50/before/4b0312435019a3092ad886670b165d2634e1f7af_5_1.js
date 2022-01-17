function(err, res) {
        return puts(res) && (typeof cb === "function" ? cb() : void 0);
      }