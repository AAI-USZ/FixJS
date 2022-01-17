function(err, remote) {
    if (err) return callback(err);
    if (!remote) return callback(new Error('`remote` url is required'));

    // if remote contains a '#' treat the hash as a branch
    if (remote.indexOf('#') !== -1) {
      if (branch) throw new Error('cannot define branch both as a remote url hash and in options');
      
      var _ = remote.split('#');
      remote = _[0];
      branch = _[1];
    }

    // parse remote using the remote parser
    var remote_input = remote; // store for saving into girror file
    remote = remote_type(remote);
    if (!branch) branch = 'master'; // default branch in case it was not defined anywhere

    // calc baredir name by replacing any non-fs chars in remote url. 
    var dirname = remote.replace(/[\\\/\:@\.]/g, '_');
    var dirpath = path.join(cachedir, dirname);

    return function girrorseq() {
      async.series([

        // make sure we have a bare repo to work with
        $log('bare repository under: ' + dirpath),
        $mkdirp(dirpath),
        $git(dirpath, ['init', '--bare']), // will not harm an existing repo

        // git remote rm/add origin
        $log('setting up remote origin to ' + remote),
        $git(dirpath, ['remote', 'add', 'origin', '--mirror=fetch', remote], true), // ignore errors (in case remote already exist)

        // git fetch origin
        $log('fetching updates from ' + remote),
        $if(
          depth === -1,
          $git(dirpath, [ 'fetch', 'origin' ]),
          $git(dirpath, [ 'fetch', '--depth', depth, 'origin' ])
        ),

        // make sure worktree exists
        $log('checking out branch ' + branch + ' into ' + worktree),
        $mkdirp(worktree),
        $git(dirpath, [ '--work-tree', worktree, 'checkout', '-f', branch ]),

        // create girrorfile
        $girrorfile(worktree, girrorfile, remote_input, branch),

      ], function(err) {
        // exit code 128 indicates an unexpected error.
        // http://stackoverflow.com/questions/4917871/does-git-return-specific-return-error-codes
        if (err && err.exitCode === 128) {
          logger.warn(dirpath + ' seems to be corrupted. Trying to recreate.');

          // rm -fr dir
          return rimraf(dirpath, function(err) {
            if (err) {
              logger.error('Unable to clean up (rm -fr) ' + dirpath);
              return callback(err);
            }

            // try again
            return girrorseq();
          });
        }
        return callback(err);
      });
    }();
  }