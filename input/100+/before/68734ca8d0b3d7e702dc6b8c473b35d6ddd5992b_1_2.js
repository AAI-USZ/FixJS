function() {

    ConsoleReporter.prototype.errors = null;

    ConsoleReporter.prototype.config = null;

    ConsoleReporter.prototype.passed = 0;

    ConsoleReporter.prototype.failed = 0;

    ConsoleReporter.prototype.total = 0;

    function ConsoleReporter(config) {
      var _base, _base1, _base2, _base3, _base4, _base5, _base6, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      this.errors || (this.errors = []);
      this.config || (this.config = config || {});
      if ((_ref = (_base = this.config).start) == null) {
        _base.start = '';
      }
      if ((_ref1 = (_base1 = this.config).fail) == null) {
        _base1.fail = ' ✘  ';
      }
      if ((_ref2 = (_base2 = this.config).pass) == null) {
        _base2.pass = ' ✔  ';
      }
      if ((_ref3 = (_base3 = this.config).sub) == null) {
        _base3.sub = ' ➞  ';
      }
      if ((_ref4 = (_base4 = this.config).failHeading) == null) {
        _base4.failHeading = 'Error #%s:';
      }
      if ((_ref5 = (_base5 = this.config).summaryPass) == null) {
        _base5.summaryPass = "%s/%s tests ran successfully, everything passed";
      }
      if ((_ref6 = (_base6 = this.config).summaryFail) == null) {
        _base6.summaryFail = "%s/%s tests ran successfully, with %s errors";
      }
      if (cliColor != null) {
        if (__indexOf.call(typeof process !== "undefined" && process !== null ? process.argv : void 0, '--no-colors') < 0) {
          this.config.fail = cliColor.red(this.config.fail);
          this.config.pass = cliColor.green(this.config.pass);
          this.config.sub = cliColor.gray(this.config.sub);
          this.config.failHeading = cliColor.red.underline(this.config.failHeading);
          this.config.summaryPass = cliColor.green.underline(this.config.summaryPass);
          this.config.summaryFail = cliColor.red.bold.underline(this.config.summaryFail);
        }
      }
    }

    ConsoleReporter.prototype.getSuiteName = function(suite) {
      var parentSuite, parentSuiteName, suiteName;
      suiteName = suite.getSuiteName();
      parentSuite = suite.getParentSuite();
      if (parentSuite) {
        parentSuiteName = this.getSuiteName(parentSuite);
        suiteName = "" + parentSuiteName + this.config.sub + suiteName;
      }
      return suiteName;
    };

    ConsoleReporter.prototype.getTestName = function(suite, testName) {
      var suiteName;
      if (suite != null) {
        suiteName = this.getSuiteName(suite);
        testName = "" + suiteName + this.config.sub + testName;
      }
      return testName;
    };

    ConsoleReporter.prototype.startSuite = function(suite) {
      var message, suiteName;
      suiteName = this.getSuiteName(suite);
      message = "" + suiteName + this.config.start;
      console.log(message);
      return this;
    };

    ConsoleReporter.prototype.finishSuite = function(suite, err) {
      var check, message, suiteName;
      if (err && this.errors.length === 0) {
        this.uncaughtException(err);
      }
      suiteName = this.getSuiteName(suite);
      check = (err ? this.config.fail : this.config.pass);
      message = "" + suiteName + check;
      console.log(message);
      return this;
    };

    ConsoleReporter.prototype.startTest = function(suite, testName) {
      var message;
      ++this.total;
      testName = this.getTestName(suite, testName);
      message = "" + testName + this.config.start;
      console.log(message);
      return this;
    };

    ConsoleReporter.prototype.finishTest = function(suite, testName, err) {
      var check, message;
      if (err) {
        this.errors.push({
          suite: suite,
          testName: testName,
          err: err
        });
        ++this.failed;
      } else {
        ++this.passed;
      }
      testName = this.getTestName(suite, testName);
      check = (err ? this.config.fail : this.config.pass);
      message = "" + testName + check;
      console.log(message, (typeof process !== "undefined" && process !== null) === false && err ? [err, err.stack] : '');
      return this;
    };

    ConsoleReporter.prototype.uncaughtException = function(err) {
      this.errors.push({
        testName: 'uncaughtException',
        err: err
      });
      return this;
    };

    ConsoleReporter.prototype.exit = function() {
      var error, index, suite, testName, _i, _len, _ref, _ref1;
      if (this.errors.length === 0) {
        console.log("\n" + this.config.summaryPass, this.passed, this.total);
      } else {
        console.log("\n" + this.config.summaryFail, this.passed, this.total, this.errors.length);
        _ref = this.errors;
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          error = _ref[index];
          suite = error.suite, testName = error.testName, err = error.err;
          testName = this.getTestName(suite, testName);
          console.log("\n" + this.config.failHeading, index + 1);
          console.log(testName);
          console.log(((_ref1 = err.stack) != null ? _ref1.toString() : void 0) || err);
        }
        console.log('');
      }
      return this;
    };

    return ConsoleReporter;

  }