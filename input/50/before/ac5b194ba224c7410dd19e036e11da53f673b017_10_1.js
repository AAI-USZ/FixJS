function(app, fn) {
      return this.request({
        method: "GET",
        path: "/apps/" + app + "/releases"
      }, fn);
    }