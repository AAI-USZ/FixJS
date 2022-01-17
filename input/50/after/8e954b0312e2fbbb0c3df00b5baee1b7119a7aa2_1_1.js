function(status) {
      return typeof callback === "function" ? callback(status) : void 0;
    }