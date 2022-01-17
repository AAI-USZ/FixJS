function (error, stdout, stderr) {
        if (error !== null) {
          self.log.warn('commitRepo: ' + forkedRepo.blue.bold + ' ERROR DETECTED!'.red.bold);
          console.dir(error);
          console.dir(stdout);
          console.dir(stderr);
          if (stdout === '# On branch clean\nnothing to commit (working directory clean)\n') {
            self.log.info(forkedRepo.blue.bold + '@' + repoLocation.yellow.bold + ':clean branch ' + 'NOTHING TO COMMIT'.red.bold);
            options.dbAdd(link);
            return cb(null, 'DONE');
          } else {
            //return cb(error);
            return cb(null, 'DONE');
          }
        } else {
          self.log.info(forkedRepo.blue.bold + '@' + repoLocation.yellow.bold + ':clean branch ' + 'COMMIT'.green.bold);
          return cb(null, 'OK');
        }
      }