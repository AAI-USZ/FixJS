function(err, res) {
        return console.log(res) && (typeof cb === "function" ? cb() : void 0);
      }