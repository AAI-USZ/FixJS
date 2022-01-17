function (settings, status, cb) {
    if (status === 'DONE') {
      return cb(null, 'DONE');
    }
    var gitDir, cmd, child,
    user         = settings.user,
    repo         = settings.repo,
    link         = settings.link,
    forkedRepo   = settings.forkedRepo,
    repoLocation = settings.repoLocation;
    gitDir = path.resolve(path.join(repoLocation, '.git')).toString();
    self.log.info("Attempting a remote add forked origin @" +  repoLocation.yellow.bold);
    cmd = 'git --git-dir="' + gitDir + '" --work-tree="' + repoLocation  + '" remote add -f origin git@github.com:' + options.username + '/' + repo + '.git';
    self.log.debug('calling: "' + cmd.grey + '"');
    child = exec(cmd,
      function (error, stdout, stderr) {
        if (error !== null) {
          self.log.warn('');
          self.log.warn('');
          self.log.warn('################################################################################'.red.inverse);
          self.log.warn('remoteAddForkedOrigin: ' + repoLocation.yellow.bold + ' ERROR DETECTED!'.red.bold);
          console.dir(error);
          console.dir(stdout);
          console.dir(stderr);
          self.log.warn('################################################################################'.red.inverse);
          self.log.warn('');
          self.log.warn('');


          return cb(null, 'DONE');

        } else {
          self.log.info(repoLocation.yellow.bold + 'remote add -f origin' + ' FORKED ORIGIN ADDED'.green.bold);
          return cb(null, 'OK');
        }
      });
  }