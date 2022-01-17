function (settings, status, cb) {
    if (!options.deleteRepo) {
      self.log.debug('options.deleteRepo not set or false, skipping pull request.');
      return cb(null, 'DONE');
    }
    var user         = settings.user,
        repo         = settings.repo,
        link         = settings.link,
        forkedRepo   = settings.forkedRepo,
        repoLocation = settings.repoLocation;
    if (status === 'DONE') {

      var client     = github.client(github_token),
        endpoint     = '/repos/' + options.username + '/' + repo;
      github_token_ct -= 1;

      client.del(endpoint, {},  function (err, status, body) {
        console.dir(err);
        console.dir(status);
        console.dir(body);
        if (err) {
          self.log.error('Could not delete ' + endpoint.blue + ' : ' + body);
          //return cb({message: err + ' ' + endpoint});
          return cb(null, 'OK');
        }
        if (status === 204) { //Status: 204 No Content
          self.log.info('Succesfully deleted ' + endpoint.blue);
          return cb(null, 'OK');
        } else {
          self.log.warn('Could not delete ' + endpoint.blue + ' : ' + body);
          return cb(null, 'OK');
        }
      });
    } else {
      self.log.warn('Did not delete ' + repo.blue);
      cb(null, 'OK');
    }
  }