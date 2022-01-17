function (err, results) {
      if (err) {
        self.log.error("Error makeChangesAndCommits: " + err);
        return cb(err);
      } else {
        return cb(null, results);
      }
    }