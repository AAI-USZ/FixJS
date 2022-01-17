function (fileList, settings, cb) { //results is file list as determined by filter, link is the repo link
    async.mapSeries(options.changesList, function (obj, callback) {
      makeChangeAndCommit(obj, fileList, settings, callback);
    }, function (err, results) {
      if (err) {
        self.log.error("Error makeChangesAndCommits: " + err);
        return cb(err);
      } else {
        console.dir(results);
        return cb(null, results);
      }
    });

  }