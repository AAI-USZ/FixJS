function(branch, path, content, message, cb) {
        updateTree(branch, function(err, latestCommit) {
          that.postBlob(content, function(err, blob) {
            that.updateTree(latestCommit, path, blob, function(err, tree) {
              that.commit(latestCommit, tree, message, function(err, commit) {
                that.updateHead(branch, commit, cb);
              });
            });
          });
        });
      }