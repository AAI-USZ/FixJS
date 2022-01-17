function(failureStacktraces, verboseSpecs) {
        var failedTests, failures,
          _this = this;
        failedTests = [];
        failures = failureStacktraces.split("\n\n");
        failures.each(function(failure) {
          var error;
          error = _this.parseFailure(failure);
          _this.specFails(error);
          return failedTests.push(error.fileName);
        });
        return this.testsPassedExcept(failedTests);
      }