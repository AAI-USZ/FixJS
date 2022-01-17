function pollJenkins(asyncCallback) {
    var errorMsg;

    if (!polling) {  // Wait a few seconds before the first poll
      polling = true;
      setTimeout(asyncCallback, self._options.delay);
      return;
    }

    if (attempts > self._options.attempts) {
      errorMsg = util.format('ERROR: Jenkins did not report a build after checking %s times',
                             attempts);
      return asyncCallback(new Error(errorMsg), null);
    }

    setTimeout(getLastBuild, self._options.delay, asyncCallback);
  }