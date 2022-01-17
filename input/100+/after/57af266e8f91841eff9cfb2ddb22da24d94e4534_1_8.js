function (error, stdout, stderr) {
        console.dir(error);
        console.dir(stdout);
        console.dir(stderr);
        if (error !== null) {
          self.log.warn('cloneRepo: ' + settings.forkedRepo.blue.bold + ' ERROR DETECTED!'.red.bold);
          if (stderr.indexOf('already exists') !== -1) {
            self.log.warn(settings.forkedRepo.blue.bold + ' FAILED cloned to '.red.bold + settings.repoLocation.yellow.bold + ' : We may have already cloned this one!'.magenta.bold);
            return cb(null, 'OK'); //ok? should we assume it might not have been processed? Lets see where it goes... shouldn't hurt
          } else if (stderr.indexOf('not found') !== -1) {
            self.log.warn(settings.forkedRepo.blue.bold + ' FAILED cloned to '.red.bold + settings.repoLocation.yellow.bold + ' : NOT FOUND!'.magenta.bold);
            options.dbAdd(settings.link);// sometimes a repository just apears to not exist.. moved or account removed?
            return cb(null, 'DONE');
          } else {
            //return cb(error);
            return cb(null, 'DONE');
          }
        } else {
          self.log.info(settings.forkedRepo.blue.bold + '@' + settings.repoLocation.yellow.bold + 'SUCCESFULLY CLONED!'.green.bold);
          return cb(null, 'OK');
        }
      }