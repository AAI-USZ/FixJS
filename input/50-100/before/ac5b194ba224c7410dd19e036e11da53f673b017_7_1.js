function(app, options, fn) {
      if (fn == null) {
        fn = options;
        options = {};
      }
      return this.request({
        method: "GET",
        path: "/apps/" + app + "/logs",
        query: options
      }, fn);
    }