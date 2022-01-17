function() {
      this.repos = function(cb) {
        _request("GET", "/user/repos?type=all&per_page=100", null, function(err, res) {
          cb(err, res);
        });
      };
    }