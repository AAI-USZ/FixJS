function (link, repoLocation, status, cb) {
    if (status === 'DONE') {
      return cb(null, 'DONE');
    }
    walk(repoLocation, function (err, results) {
        if (err) {
          //return cb(err);
          return cb(null, 'DONE');
        }

        options.makeFileChanges(results, link, function (err, status) {
          if (err) {
            //return cb(err);
            return cb(null, 'DONE');
          }

          if (status.indexOf('OK') === -1) {
            self.log.warn('');
            self.log.warn('');
            self.log.warn('----------------------------------------------------------------------------------'.red);
            self.log.warn('Nothing to do for '.bold.red + repoLocation.yellow);
            self.log.warn('----------------------------------------------------------------------------------'.red);
            self.log.warn('');
            self.log.warn('');
            options.dbAdd(link);
            return cb(null, 'DONE');
          } else {
            return cb(null, 'OK');
          }
        });

      });
  }