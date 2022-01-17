function(parent, tree, message, parentCommit, cb) {
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
          currentTree.sha = parentCommit;
          if (err) return cb(err);
          cb(null, res.sha);
        });
      }