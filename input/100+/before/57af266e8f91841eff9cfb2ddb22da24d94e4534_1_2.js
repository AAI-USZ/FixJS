function (status, callback) {
        self.log.info('');
        self.log.info('');
        self.log.info('');
        self.log.info('');
        self.log.info('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'.cyan);
        self.log.info('Starting new Clone ' + user.magenta.bold + '/' + repo.yellow.bold);
        self.log.info('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'.cyan);
        self.log.info('');
        self.log.info('');
        self.log.info('');
        self.log.info('');
        gitQue.push({task: cloneRepo(user, repo, link, forkedRepo, repoLocation, callback), info: '   git:cloneRepo :: ' + forkedRepo});
      }