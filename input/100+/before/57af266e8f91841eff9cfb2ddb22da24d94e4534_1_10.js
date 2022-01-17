function (error, stdout, stderr) {
              if (error !== null) {
                self.log.warn('switchBranch::2: ' + forkedRepo.blue.bold + ' ERROR DETECTED!'.red.bold);
                console.dir(error);
                console.dir(stdout);
                console.dir(stderr);
                //return cb(error);
                return cb(null, 'DONE');
              } else {
                self.log.info(forkedRepo.blue.bold + '@' + repoLocation.yellow.bold + ':clean branch ' + 'checked out'.green.bold);
                return cb(null, 'OK');
              }
            }