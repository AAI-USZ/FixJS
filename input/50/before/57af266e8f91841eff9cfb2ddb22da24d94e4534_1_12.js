function (callback) {
            self.log.warn('Endpoint ' + endpoint.blue + ' seems to already exist. Deleting...'.inverse.blue);
            deleteRepo(repo, 'DONE', callback);
          }