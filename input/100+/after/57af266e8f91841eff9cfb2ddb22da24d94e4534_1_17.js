function (err, status) {
          if (err) {
            //return cb(err);
            return cb(null, 'DONE');
          }

          if (status.indexOf('OK') === -1) {
            self.log.warn('');
            self.log.warn('');
            self.log.warn('----------------------------------------------------------------------------------'.red);
            self.log.warn('Nothing to do for '.bold.red + settings.repoLocation.yellow);
            self.log.warn('----------------------------------------------------------------------------------'.red);
            self.log.warn('');
            self.log.warn('');
            options.dbAdd(settings.link);
            return cb(null, 'DONE');
          } else {
            return cb(null, 'OK');
          }
        }