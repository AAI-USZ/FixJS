function(issues) {
  var that = this;

  if (issues.length < 1) {
    process.exit(0);
  }

  this.reportIssues(issues);

  async.series([
    function backToOrigBranch(next) {
      exec('git checkout ' + origBranch, function(err, stdout, stderr) {
        next();
      });
    },
    function cleanUpBranches(next) {
      exec('git branch', function(err, stdout, stderr) {
        if (err || stderr) {next(new Error(err || stderr));}
        _.invoke(stdout.split('\n'), 'trim').forEach(function(branch) {
          if (branch.indexOf(that.options.branchPrepend) !== -1) {

            // delete branch
            exec('git branch -D ' + branch, function(err, stdout, stderr) {
              if (err || stderr) {next(new Error(err || stderr));}
              next();
            });

          }
        });
      });
    }
  ], function onEndIsDone(err, result) {
    if (err) {throw err;}

    // delete tmp folder
    if (path.dirname(that.options.tmp) === process.cwd()) {
      that.file.rmdir(that.options.tmp);
    }

    process.exit(0);
  });
}