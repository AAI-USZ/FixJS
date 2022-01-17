function() {
      this.repos = function(cb) {
        _request("GET", "/user/repos?type=all&per_page=100", null, function(err, res) {
          cb(err, res);
        });
      };

      // List user organizations
      // -------

      this.orgs = function(cb) {
        _request("GET", "/user/orgs", null, function(err, res) {
          cb(err, res);
        });
      };

      // Show user information
      // -------

      this.show = function(username, cb) {
        _request("GET", "/users/"+username, null, function(err, res) {
          cb(err, res);
        });
      }

      // List user repositories
      // -------

      this.userRepos = function(username, cb) {
        _request("GET", "/users/"+username+"/repos?type=all&per_page=100", null, function(err, res) {
          cb(err, res);
        });
      };

      // List organization repositories
      // -------

      this.orgRepos = function(orgname, cb) {
        _request("GET", "/orgs/"+orgname+"/repos?type=all&per_page=100", null, function(err, res) {
          cb(err, res);
        });
      };
    }