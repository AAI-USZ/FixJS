function(err) {
      if (err) {
        console.log("FAIL:", err);
        return;
      }
      return f.apply(null, Array.prototype.slice.call(arguments, 1));
    }