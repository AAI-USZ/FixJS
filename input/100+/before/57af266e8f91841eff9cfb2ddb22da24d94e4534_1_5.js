function (link, forkedRepo, username, user, repo, repoLocation, status, cb) {
    if (status === 'DONE') {
      return cb(null, 'DONE');
    } else if (!options.forkRepo) {
      self.log.debug('options.forkRepo not set or false, skipping fork.');
      return cb(null, 'DONE');
    }
    self.log.info('Forking ' + user.magenta.bold + '/' + repo.yellow.bold);
    var client   = github.client(github_token);
    github_token_ct -= 1;
    self.log.info('');
    self.log.info('');
    self.log.info('forkRepo');
    self.log.info('============================================================================'.green.inverse);
    self.log.info('link, forkedRepo, options.username, user, repo, repoLocation');
    self.log.info('============================================================================'.green.inverse);
    self.log.info(link + ' | ' + forkedRepo + ' | ' + options.username + ' | ' + user + ' | ' + repo + ' | ' + repoLocation);
    self.log.info('');
    self.log.info('');

    client.me().fork(user + '/' + repo, function (err, data) {
      if (err) {
        self.log.error(err + ' ' + link.yellow.bold);
        self.log.debug('data:  ' + data);
        self.log.debug(':user/:repo = ' + user + '/' + repo);
        if (err.toString().indexOf('Not Found') !== -1) {
          self.log.warn('Could not fork : ' + link.yellow.bold + ' NOT FOUND!'.red.bold);
          return cb(null, 'DONE');
        } else {
          //return cb(err);
          return cb(null, 'DONE');
        }
      } else {
        self.log.warn('Forked : ' + link.yellow.bold + ' SUCCESS!'.green.bold);
        return cb(null, 'OK');
      }
    });
  }