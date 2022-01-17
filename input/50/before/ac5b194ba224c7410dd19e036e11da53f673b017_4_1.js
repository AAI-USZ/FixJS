function(app, domain, fn) {
      return this.request({
        method: "DELETE",
        path: "/apps/" + app + "/domains/" + (CGI.escape(domain))
      }, fn);
    }