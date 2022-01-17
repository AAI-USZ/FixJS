function (link, cb) {
    var parse        = XRegExp(/.*github.com[\/|:]([\w|\-]+)\/([\w|\-|\.]+)(\.git$|[\/]$|$)/g),
        user         = XRegExp.replace(link, parse, '$1'),
        repo_pre     = XRegExp.replace(link, parse, '$2'),
        repo         = repo_pre.replace('.git', ''),
        forkedRepo   = 'https://github.com/' + options.username + '/' + repo,
        tmpDir       = path.resolve(path.join('.', 'tmp')),
        repoLocation = path.resolve(path.join(path.join(tmpDir, user), repo)).toString();

    async.waterfall([
      //function (callback) {
        //watchRepo(user, repo, callback);
      //},//watch repo
      function (callback) {checkGithubToken('OK', callback); },
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
      },// clone repo
      function (status, callback) {
        gitQue.push({task: switchBranch(forkedRepo, repoLocation, status, callback), info: 'git:switchBranch :: ' + forkedRepo});
      },// switch branch
      function (status, callback) {
        walkAndFix(link, repoLocation, status, callback);
      },// walkAndFix
      function (status, callback) {
        gitQue.push({task:  remoteRename(repoLocation, status, callback), info: '  git:remoteRename :: ' + forkedRepo});
      },// rename origin upstream
      function (status, callback) {
        deleteRepoIfExists(repo, status, callback);
      }, // delete a repo if it already exists
      function (status, callback) { //We will now fork if there were changes
        forkRepo(link, forkedRepo, options.username, user, repo, repoLocation, status, callback);
      },//fork
      function (status, callback) {
        notifyAvailability(forkedRepo, options.username, repo, repoLocation, status, callback);
      },// wait for availability
      function (status, callback) {
        gitQue.push({task:  remoteAddForkedOrigin(repo, repoLocation, status, callback), info: '  git:remoteAddForkedOrigin :: ' + forkedRepo});
      },// rename origin upstream
      function (status, callback) {
        gitQue.push({task: commitRepo(link, forkedRepo, repoLocation, status, callback), info: '  git:commitRepo :: ' + forkedRepo});
      },// commit
      function (status, callback) {
        gitQue.push({task: pushCommit(forkedRepo, repoLocation, status, callback), info: '  git:pushCommit :: ' + forkedRepo});
      },// push
      function (status, callback) {
        submitPullRequest(link, options.username, user, repo, status, callback);
      },// submit pull request
      function (status, callback) {
        deleteRepo(repo, status, callback);
      },// delete forked repo if there is not a pull request to make
      function (status, callback) {
        cleanUpFileSystem(repoLocation, callback);
      }//clean up filesystem
    ],
      function (err, result) {//callback
        if (err) {
          //return cb(err);
          return cb(null, 'DONE');
        }
        self.log.info(options.botname.grey + ' Done with '.green + link.blue.bold + ' RESULT: '.grey + result);
        return cb(null, result);
      });
  }