function(app, key, fn) {
      return this.request({
        method: "DELETE",
        path: "/apps/" + app + "/config_vars/" + key
      }, fn);
    }