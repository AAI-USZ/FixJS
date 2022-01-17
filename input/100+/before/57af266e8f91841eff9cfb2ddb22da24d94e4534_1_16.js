function (forkedRepo, username, repo, repoLocation, status, cb) {
    if (status === 'DONE') {
      return cb(null, 'DONE');
    }
    var count    = 0,
        Available = false;
    async.until(// wait for availability
        function () {
          if (count % 2 === 0) {
            self.log.info('Waiting for ' + options.username.magenta.bold + '/' + repo.yellow.bold + ' to become available...');
          }
          request.head(forkedRepo, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              Available = true;
            }
          });
          return count > 30 || Available;
        },
          function (cb) {
            count++;
            setTimeout(cb, 2000);
          },
        function (err) {
            // 5 minutes have passed
            if (count > 300) {
              self.log.error('Unable to find forked repo ' + options.username.magenta.bold + '/' + repo.yellow.bold + ' after 1 minutes.');

            } else {
              self.log.info('Forked repo ' + options.username.magenta.bold + '/' + repo.yellow.bold + ' Exists!');
              if (Available) {
                return cb(null, 'OK');//Change to 'DONE' if you dont want to clone
              } else {
                return cb(null, "error: Timeout");
              }
            }
          }
      );
  }