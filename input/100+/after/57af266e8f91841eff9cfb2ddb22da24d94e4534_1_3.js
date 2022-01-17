function (link, cb) {
    var parse        = XRegExp(/.*github.com[\/|:]([\w|\-]+)\/([\w|\-|\.]+)(\.git$|[\/]$|$)/g),
        user         = XRegExp.replace(link, parse, '$1'),
        repo_pre     = XRegExp.replace(link, parse, '$2'),
        repo         = repo_pre.replace('.git', ''),
        forkedRepo   = 'https://github.com/' + options.username + '/' + repo,
        tmpDir       = path.resolve(path.join('.', 'tmp')),
        repoLocation = path.resolve(path.join(path.join(tmpDir, user), repo)).toString(),
        settings     = { "user"         : user,
                         "repo"         : repo,
                         "link"         : link,
                         "forkedRepo"   : forkedRepo,
                         "repoLocation" : repoLocation};

    async.waterfall([
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
        gitQue.push({task: cloneRepo(settings, callback), info: '   git:cloneRepo :: ' + settings.forkedRepo});
      },// clone repo
      function (status, callback) {
        gitQue.push({task: switchBranch(settings, status, callback), info: 'git:switchBranch :: ' + settings.forkedRepo});
      },// switch branch
      function (status, callback) {
        walkAndFix(settings, status, callback);
      },// walkAndFix also makes fixes and commits if necessary
      function (status, callback) {
        gitQue.push({task:  remoteRename(settings, status, callback), info: '  git:remoteRename :: ' + settings.forkedRepo});
      },// rename origin upstream
      function (status, callback) {
        deleteRepoIfExists(settings, status, callback);
      }, // delete a repo if it already exists
      function (status, callback) { //We will now fork if there were changes
        forkRepo(settings, status, callback);
      },//fork
      function (status, callback) {
        notifyAvailability(settings, status, callback);
      },// wait for availability
      function (status, callback) {
        gitQue.push({task:  remoteAddForkedOrigin(settings, status, callback), info: '  git:remoteAddForkedOrigin :: ' + forkedRepo});
      },// rename origin upstream
      function (status, callback) {
        gitQue.push({task: pushCommit(settings, status, callback), info: '  git:pushCommit :: ' + forkedRepo});
      },// push
      function (status, callback) {
        submitPullRequest(settings, status, callback);
      },// submit pull request
      function (status, callback) {
        deleteRepo(settings, status, callback);
      },// delete forked repo if there is not a pull request to make
      function (status, callback) {
        cleanUpFileSystem(settings, callback);
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