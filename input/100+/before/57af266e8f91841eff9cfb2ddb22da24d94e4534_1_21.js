function (repo, status, cb) {
    if (status === 'DONE') {
      return cb(null, 'DONE');
    } else if (!options.deleteRepo) {
      self.log.debug('options.deleteRepo not set or false, skipping pull request.');
      return cb(null, 'DONE');
    }

    var client = github.client(github_token),
    endpoint = '/repos/' + options.username + '/' + repo;
    github_token_ct -= 1;

    client.get(endpoint, function (err, status, body) {
      if (err) {
        return cb(null, 'OK');
      } else {

        async.waterfall([
          function (callback) {
            self.log.warn('Endpoint ' + endpoint.blue + ' seems to already exist. Deleting...'.inverse.blue);
            deleteRepo(repo, 'DONE', callback);
          },
          function (status, callback) { waitAMinute('OK', callback); }
        ],
         function (err, result) {//callback
          if (err) {
            //return cb(err);
            return cb(null, 'DONE');
          }
          self.log.info('REFORKED '.green.inverse + endpoint.blue);
          return cb(null, 'OK');
        });
      }
    });

  }