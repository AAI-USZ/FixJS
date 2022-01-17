function(builder, branch, revision, callback) {
  var self = this;
  var build = null;
  var polling = false;
  var attempts = 0;

  function getLastBuild(callback) {
    self.getRevision(builder, revision, function(err, last_build) {
      if (err) {
        return callback(err, null);
      }

      if (!build || build.building === false) {
        attempts++;
      }

      build = last_build;
      callback(null, build);
    });
  }

  function pollJenkins(asyncCallback) {
    var errorMsg;

    if (!polling) {  // Wait a few seconds before the first poll
      polling = true;
      setTimeout(asyncCallback, self._options.delay);
      return;
    }

    if (attempts > self._options.attempts) {
      errorMsg = util.format('ERROR: Jenkins did not report a build after checking %s times',
                             attempts)
      return asyncCallback(new Error(errorMsg), null);
    }

    setTimeout(getLastBuild, self._options.delay, asyncCallback);
  }

  function isBuilt() {
    if (self.isBuildComplete(build)) {
      return true;
    }

    if (polling === false) {   // Kick the build, this is the first poll
      if (!build || build.building === false) {
        self.build(builder, branch, revision, function(err, resp, body) {
          if (err) {
            return callback(err, null);
          }
        });
      }
    }
    return false;
  }

  getLastBuild(function(err, retrievedBuild) {
    if (err) {
      callback(err);
    } else if (retrievedBuild && self.isBuildComplete(build)) {
      callback(null, retrievedBuild);
    } else {
      async.until(isBuilt, pollJenkins, function(err) { callback(err, build); });
    }
  });
}