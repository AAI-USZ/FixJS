function (forkedRepo, repoLocation, status, cb) {
    if (status === 'DONE') {
      return cb(null, 'DONE');
    }
    var gitDir, cmd, child;
    gitDir = path.resolve(path.join(repoLocation, '.git')).toString();
    self.log.info("Attempting a push commit on branch clean @" +  repoLocation.yellow.bold);
    cmd = 'git --git-dir="' + gitDir + '" --work-tree="' + repoLocation  + '" push origin clean';
    self.log.debug('calling: "' + cmd.grey + '"');
    child = exec(cmd,
      function (error, stdout, stderr) {
        if (error !== null) {
          self.log.warn('pushCommit: ' + forkedRepo.blue.bold + ' ERROR DETECTED!'.red.bold);
          console.dir(error);
          console.dir(stdout);
          console.dir(stderr);

          if (stdout === 'To prevent you from losing history, non-fast-forward updates were rejected\nMerge the remote changes before pushing again.  See the \'Note about\nfast-forwards\' section of \'git push --help\' for details.\n') {
            self.log.warn(forkedRepo.blue.bold + '@' + repoLocation.yellow.bold + ':clean branch ' + 'COMMIT NOT PUSHED'.red.bold + ' : We may have already pushed to this fork!'.magenta.bold);
            return cb(null, 'OK');
          } else {
            //return cb(error);
            return cb(null, 'DONE');
          }
        } else {
          self.log.info(forkedRepo.blue.bold + '@' + repoLocation.yellow.bold + ':clean branch ' + 'COMMIT PUSHED'.green.bold);
          return cb(null, 'OK');
        }
      });
  }