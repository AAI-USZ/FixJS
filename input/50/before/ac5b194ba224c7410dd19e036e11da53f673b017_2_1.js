function(app, email, fn) {
      return this.request({
        method: DELETE,
        path: "/apps/" + app + "/collaborators/" + email
      }, fn);
    }