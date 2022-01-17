function(err, res) {
          console.log(res);
          console.log(err);
          var res_sha = res.sha;
          currentTree.sha = res_sha;
          if (err) return cb(err);
          cb(null, res.sha);
        }