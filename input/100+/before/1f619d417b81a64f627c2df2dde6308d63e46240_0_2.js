function(parent, tree, message, cb) {
        var data = {
          "message": message,
          "author": {
            "name": options.username
          },
          "parents": [
            parent
          ],
          "tree": tree
        };

        _request("POST", repoPath + "/git/commits", data, function(err, res) {
          console.log(res);
          console.log(err);
          var res_sha = res.sha;
          currentTree.sha = res_sha;
          if (err) return cb(err);
          cb(null, res.sha);
        });
      }