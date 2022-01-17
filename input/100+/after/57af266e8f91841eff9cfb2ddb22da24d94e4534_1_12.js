function (settings, status, cb) {
    if (status === 'DONE') {
      return cb(null, 'DONE');
    }
    var gitDir, cmd, child, message,
    user         = settings.user,
    repo         = settings.repo,
    link         = settings.link,
    forkedRepo   = settings.forkedRepo,
    repoLocation = settings.repoLocation,
    message = settings.message;
    gitDir = path.resolve(path.join(repoLocation, '.git')).toString();
    self.log.info("Attempting a commit on " +  repoLocation.yellow.bold);
    cmd = 'git --git-dir="' + gitDir + '" --work-tree="' + repoLocation  + '" commit -am "' + message + '"';
    self.log.debug('calling: "' + cmd.grey + '"');
    child = exec(cmd,
      function (error, stdout, stderr) {
        if (error !== null) {
          self.log.warn('commitRepo: ' + forkedRepo.blue.bold + ' ERROR DETECTED!'.red.bold);
          console.dir(error);
          console.dir(stdout);
          console.dir(stderr);

          if (stdout === '# On branch clean\nnothing to commit (working directory clean)\n') {
            self.log.info(forkedRepo.blue.bold + '@' + repoLocation.yellow.bold + ':clean branch ' + 'NOTHING TO COMMIT'.red.bold);
            if (options.addOnFailedCommit) {options.dbAdd(link); }
            return cb(null, 'DONE');
          } else {
            //return cb(error);
            return cb(null, 'DONE');
          }
        } else {
          self.log.info(forkedRepo.blue.bold + '@' + repoLocation.yellow.bold + ':clean branch ' + 'COMMIT'.green.bold);
          return cb(null, 'OK');
        }
      });
  }