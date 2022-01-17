function(err, res) {
          currentTree.sha = parentCommit;
          if (err) return cb(err);
          cb(null, res.sha);
        }