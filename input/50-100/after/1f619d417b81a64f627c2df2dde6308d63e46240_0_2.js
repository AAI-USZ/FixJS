function(branch, path, content, message, parentCommit, cb) {
        updateTree(branch, function(err, latestCommit) {
          that.postBlob(content, function(err, blob) {
            that.updateTree(latestCommit, path, blob, function(err, tree) {
              that.commit(latestCommit, tree, message, parentCommit, function(err, commit) {
                that.updateHead(branch, commit, cb);
              });
            });
          });
        });
      }