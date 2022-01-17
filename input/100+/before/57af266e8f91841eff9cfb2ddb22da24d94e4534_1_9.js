function (user, repo, link, forkedRepo, repoLocation, cb) {
    var cmd, child;
    self.log.info("Attempting to clone " +  forkedRepo.blue.bold);
    //cmd = 'git clone git@github.com:' + options.username + '/' + repo + '.git "' + repoLocation + '"';
    //clone the users repo... fork later and add new origin
    //cmd = 'git clone git@github.com:' + user + '/' + repo + '.git "' + repoLocation + '"';
    cmd = 'git clone git@github.com:' + user + '/' + repo + '.git "' + repoLocation + '" --no-hardlinks';
    self.log.debug('calling: "' + cmd.grey + '"');
    child = exec(cmd,
      function (error, stdout, stderr) {
        console.dir(error);
        console.dir(stdout);
        console.dir(stderr);
        if (error !== null) {
          self.log.warn('cloneRepo: ' + forkedRepo.blue.bold + ' ERROR DETECTED!'.red.bold);
          if (stderr.indexOf('already exists') !== -1) {
            self.log.warn(forkedRepo.blue.bold + ' FAILED cloned to '.red.bold + repoLocation.yellow.bold + ' : We may have already cloned this one!'.magenta.bold);
            return cb(null, 'OK'); //ok? should we assume it might not have been processed? Lets see where it goes... shouldn't hurt
          } else if (stderr.indexOf('not found') !== -1) {
            self.log.warn(forkedRepo.blue.bold + ' FAILED cloned to '.red.bold + repoLocation.yellow.bold + ' : NOT FOUND!'.magenta.bold);
            options.dbAdd(link);// sometimes a repository just apears to not exist.. moved or account removed?
            return cb(null, 'DONE');
          } else {
            //return cb(error);
            return cb(null, 'DONE');
          }
        } else {
          self.log.info(forkedRepo.blue.bold + '@' + repoLocation.yellow.bold + 'SUCCESFULLY CLONED!'.green.bold);
          return cb(null, 'OK');
        }
      });
  }