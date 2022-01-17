function(grunt) {
  'use strict';

  // libs
  var path = require('path');
  var exec = require('child_process').exec;
  var request = require('request');
  var rimraf = require('rimraf');
  var readline = require('readline');

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  // globals
  var _ = grunt.util._;
  var async = grunt.util.async;
  var tmpPatch = path.join(__dirname, '../_tmp/' + process.pid + '.patch');

  // create readline interface
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // find this user and repo
  var userRepo = (function() {
    var res = {user:'',repo:''};
    var repo = grunt.file.readJSON(path.join(__dirname, '../package.json')).repository;
    if (repo.type === 'git' && _.isString(repo.url) && repo.url.indexOf('github.com') !== -1) {
      var arr = repo.url.split('/').slice(-2);
      res.user = arr[0];
      res.repo = arr[1].replace('.git', '');
    }
    return res;
  }());

  // extract issues with pull requests
  var extractPulls = function(res) {
    var pulls = [];
    if (!_.isArray(res)) {
      return pulls;
    }
    res.forEach(function(iss) {
      if (iss.pull_request !== undefined && iss.pull_request.patch_url !== null) {
        pulls.push(iss);
      }
    });
    return pulls;
  };

  // merge the patch
  // TODO: check and mark with: Closes GH-###
  var mergePullRequest = function(patch, done) {
    exec('git am --signoff ' + patch, function applyPatch(err, stdout, stderr) {
      if (stderr) {
        grunt.log.error(stderr);
      }
      done(err, stdout);
    });
  };

  // comment on the pull request that it is unmergeable
  var notifyUnmergeable = function(github, data, done) {
    data = _.defaults(data, {
      user: userRepo.user,
      repo: userRepo.repo,
      number: 0,
      body: 'Sorry, your pull request is unmergeable. ' +
        'Could you please rebase, squash and force push it? Thanks!'
    });
    if (_.isBlank(data.body) || data.number > 0) {
      return done(); // add error
    }
    // TODO: Check if duplicate post
    github.issues.createComment(data, function githubCreateComment(err, res) {
      if (err) { throw err; }
      done(null, res);
    });
  };

  // create a patch and return file path
  var createPatch = function(data) {
    grunt.file.mkdir(path.dirname(tmpPatch));
    grunt.file.write(tmpPatch, data);
    return tmpPatch;
  };

  // clean up tmp dir and call callback
  var cleanUp = function(done) {
    rimraf.sync(path.dirname(tmpPatch));
    done();
  };

  // the show
  grunt.registerTask('willitmerge', 'Check if all open pull requests are mergeable.', function gruntRegisterTask() {
    var options = grunt.helper('options', this);
    var auth = options.auth || {};
    var isAuthed = !_.isEmpty(auth);
    var ignored = options.ignore || [];
    var done = this.async();

    // github instance
    grunt.helper('github', auth, function githubHelper(err, github) {
      var msg = {
        user: userRepo.user,
        repo: userRepo.repo,
        state: 'open'
      };

      // search github for open repo issues
      github.issues.repoIssues(msg, function githubRepoIssues(err, res) {
        var pulls = extractPulls(res);
        grunt.log.writeln('Found ' + pulls.length + ' open pull requests.');
        if (pulls.length <= 0) {
          return done();
        }

        async.forEachSeries(pulls, function asyncForEachSeries(iss, next) {
          if (_.indexOf(ignored, iss.number) !== -1) {
            grunt.log.writeln('Issue #' + iss.number + '... ' + 'SKIP'.cyan);
            return next();
          }
          grunt.log.write('Issue #' + iss.number + ', ' + iss.html_url + ', will it merge? ');

          // download and apply patch
          request(iss.pull_request.patch_url, function patchRequest(err, res, body) {
            if (!err && res.statusCode == 200) {

              // apply patch
              var cmd = 'git apply --check --stat ' + createPatch(body);
              exec(cmd, function applyPatch(err, stdout, stderr) {

                if (stderr) {
                  // failed to merge
                  grunt.log.fail('NO!');
                  grunt.log.error(stderr);

                  if (isAuthed) {
                    rl.question('Notify pull requester this is unmergeable? [y/N]', function questionNotifyUnmergeable(answer) {
                     if (answer === 'y') {
                       notifyUnmergeable(github, {
                         number: iss.number,
                         body: options.comment || null
                       }, function(err, res) {
                         cleanUp(next);
                       });
                     } else {
                       // no we dont want to notify
                       cleanUp(next);
                     }
                    });
                  } else {
                    // not authed, no post comment
                    grunt.log.error('Please supply your github auth.username and auth.password to notify pull requesters.');
                    cleanUp(next);
                  }

                } else {
                  // will merge clean
                  grunt.log.success('YES!');
                  grunt.log.ok(stdout);

                  rl.question('Merge this pull request? [y/N]', function questionMergePR(answer) {
                    if (answer === 'y') {
                      mergePullRequest(tmpPatch, function(err, res) {
                        grunt.log.ok(res);
                        cleanUp(next);
                      });
                    } else {
                      // no dont merge
                      cleanUp(next);
                    }
                  });

                }

              });
            }
          });

        }, function() {
          done();
        });

      });

    });

  });

}