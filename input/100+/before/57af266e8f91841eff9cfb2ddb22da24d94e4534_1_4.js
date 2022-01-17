function (repoLocation, cb) {
    path.exists(repoLocation, function (exists) {//if exists
      if (exists) {
        rimraf(repoLocation, function (err) {
          if (err) {
            self.log.error('ERROR Removing Repository directory : '.red.bold + repoLocation.yellow.bold);
            //return cb(err);
            return cb(null, 'DONE');
          }
          self.log.info('Removed Repository directory : ' + repoLocation.yellow.bold);
          return cb(null, 'DONE');
        });
      } else {
        self.log.warn('ERROR Repository directory does not exist : '.red.bold + repoLocation.yellow.bold);
        return cb(null, 'DONE');
      }
    });
  }