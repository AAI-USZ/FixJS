function(testCase, permutationNum) {
    // Generate a fresh deferred that uses internal counting rather than chained
    //  promises for resolution.
    var deferred = $Q.defer(), self = this;

    // -- create / setup the context
    testCase.log.run_begin();
    var defContext = new $testcontext.TestContext(testCase, 0);
    defContext._log.run_begin();

    // - push the context's logger on the runtime logging stack
    // (We want all new logged objects to be associated with the context since
    //  it should bound their lifetimes.  Although it is interesting to know
    //  what specific step a logger came-to-life, we expect that to occur via
    //  cross-referencing.  If we anchored loggers in their creating step then
    //  the hierarchy would be extremely confusing.)
    self._runtimeContext.pushLogger(defContext._log);

    // - execute the test-case definition function with the context
    var rval = defContext._log.setupFunc({}, testCase.setupFunc, defContext);
    if (rval instanceof Error) {
      // in the event we threw during the case setup phase, it's a failure.
      defContext._log.result('fail');
      testCase.log.result('fail');
      return false;
    }
    defContext.__postSetupFunc();

    // -- process the steps
    // In event of a setup/action failure, change to only running cleanup steps.
    var allPassed = true, iStep = 0;
    function runNextStep(passed) {
      if (!passed)
        allPassed = false;
      // -- done case
      if (iStep >= defContext.__steps.length) {
        // - pop the test-case logger from the logging context stack
        self._runtimeContext.popLogger(defContext._log);

        // - resolve!
        defContext._log.result(allPassed ? 'pass' : 'fail');
        defContext._log.run_end();
        testCase.log.result(allPassed ? 'pass' : 'fail');
        testCase.log.run_end();
        deferred.resolve(allPassed);
        return;
      }

      // -- yet another step case
      var step = defContext.__steps[iStep++];
      var runIt = allPassed || (step.kind === 'cleanup');
      if (runIt)
        when(self.runTestStep(step), runNextStep);
      else // for stack simplicity, run the skip in a when, but not required.
        when(self.skipTestStep(step), runNextStep);
    }
    runNextStep(true);

    return deferred.promise;
  }