function (err, results) {
      if (err) {
        self.log.error("Error makeChangesAndCommits: " + err);
        return cb(err);
      } else {
        console.dir(results);
        return cb(null, results);
      }
    }