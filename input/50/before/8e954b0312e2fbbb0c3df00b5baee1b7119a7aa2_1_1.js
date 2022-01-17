function(status) {
      return typeof callback === "function" ? callback() : void 0;
    }