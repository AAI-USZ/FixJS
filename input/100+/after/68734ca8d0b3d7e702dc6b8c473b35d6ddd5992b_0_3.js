function() {
  var Block, Suite, balUtilFlow, config, joe, joePrivate,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  balUtilFlow = (typeof require === "function" ? require('bal-util') : void 0) || this.balUtilFlow;

  Block = balUtilFlow.Block;

  config = {
    troubleshootingURL: 'https://github.com/bevry/joe/wiki/Troubleshooting'
  };

  Suite = (function(_super) {

    __extends(_Class, _super);

    function _Class() {
      return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.createSubBlock = function(opts) {
      opts.parentBlock = this;
      return new Suite(opts);
    };

    _Class.prototype.blockBefore = function(suite) {
      joePrivate.totalSuites++;
      joe.report('startSuite', suite);
      return _Class.__super__.blockBefore.apply(this, arguments);
    };

    _Class.prototype.blockAfter = function(suite, err) {
      if (err) {
        joePrivate.addErrorLog({
          suite: suite,
          err: err
        });
        joePrivate.totalFailedSuites++;
      } else {
        joePrivate.totalPassedSuites++;
      }
      joe.report('finishSuite', suite, err);
      return _Class.__super__.blockAfter.apply(this, arguments);
    };

    _Class.prototype.blockTaskBefore = function(suite, testName) {
      joePrivate.totalTests++;
      joe.report('startTest', suite, testName);
      return _Class.__super__.blockTaskBefore.apply(this, arguments);
    };

    _Class.prototype.blockTaskAfter = function(suite, testName, err) {
      if (err) {
        joePrivate.addErrorLog({
          suite: suite,
          testName: testName,
          err: err
        });
        joePrivate.totalFailedTests++;
      } else {
        joePrivate.totalPassedTests++;
      }
      joe.report('finishTest', suite, testName, err);
      return _Class.__super__.blockTaskAfter.apply(this, arguments);
    };

    _Class.prototype.getSuiteName = function() {
      return this.blockName;
    };

    _Class.prototype.getParentSuite = function() {
      return this.parentBlock;
    };

    _Class.prototype.suite = function(name, fn) {
      var _ref;
      if ((_ref = fn.length) !== 0 && _ref !== 2 && _ref !== 3) {
        throw new Error("An invalid amount of arguments were specified for a Joe Suite, more info here: " + config.troubleshootingURL);
      } else {
        return this.block(name, fn);
      }
    };

    _Class.prototype.describe = function(name, fn) {
      return this.suite(name, fn);
    };

    _Class.prototype.test = function(name, fn) {
      var _ref;
      if ((_ref = fn.length) !== 0 && _ref !== 1) {
        throw new Error("An invalid amount of arguments were specified for a Joe Test, more info here: " + config.troubleshootingURL);
      } else {
        return this.task(name, fn);
      }
    };

    _Class.prototype.it = function(name, fn) {
      return this.test(name, fn);
    };

    return _Class;

  })(Block);

  joePrivate = {
    globalSuite: null,
    getGlobalSuite: function() {
      if (joePrivate.globalSuite == null) {
        joePrivate.globalSuite = new Suite({
          name: 'joe'
        });
      }
      return joePrivate.globalSuite;
    },
    errorLogs: [],
    addErrorLog: function(errorLog) {
      var _ref;
      if (errorLog.err === ((_ref = joePrivate.errorLogs[joePrivate.errorLogs.length - 1]) != null ? _ref.err : void 0)) {

      } else {
        joePrivate.errorLogs.push(errorLog);
      }
      return joePrivate;
    },
    exited: false,
    reporters: [],
    totalSuites: 0,
    totalPassedSuites: 0,
    totalFailedSuites: 0,
    totalTests: 0,
    totalPassedTests: 0,
    totalFailedTests: 0,
    getReporters: function() {
      var Reporter, arg, argResult, defaultReporter, _i, _len, _ref;
      if (joePrivate.reporters.length === 0) {
        if ((typeof process !== "undefined" && process !== null ? process.argv : void 0) && (typeof require !== "undefined" && require !== null)) {
          defaultReporter = 'console';
          _ref = process.argv;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            arg = _ref[_i];
            argResult = arg.replace(/^--joe-reporter=/, '');
            if (argResult !== arg) {
              defaultReporter = argResult;
              break;
            }
          }
          try {
            Reporter = joe.require("reporters/" + defaultReporter);
            joe.addReporter(new Reporter());
          } catch (err) {
            console.log("Joe could not load the reporter: " + defaultReporter + ". The error is as follows:\n", err);
            joe.exit(1);
          }
        } else {
          try {
            Reporter = joe.ConsoleReporter;
            joe.addReporter(new Reporter());
          } catch (err) {
            console.log("Joe could not load the reporter: " + defaultReporter + ". The error is as follows:\n", err);
            joe.exit(1);
          }
        }
      }
      return joePrivate.reporters;
    }
  };

  joe = {
    getTotals: function() {
      var errorLogs, result, success, totalErrors, totalFailedSuites, totalFailedTests, totalIncompleteSuites, totalIncompleteTests, totalPassedSuites, totalPassedTests, totalSuites, totalTests;
      totalSuites = joePrivate.totalSuites, totalPassedSuites = joePrivate.totalPassedSuites, totalFailedSuites = joePrivate.totalFailedSuites, totalTests = joePrivate.totalTests, totalPassedTests = joePrivate.totalPassedTests, totalFailedTests = joePrivate.totalFailedTests, errorLogs = joePrivate.errorLogs;
      totalIncompleteSuites = totalSuites - totalPassedSuites - totalFailedSuites;
      totalIncompleteTests = totalTests - totalPassedTests - totalFailedTests;
      totalErrors = errorLogs.length;
      success = (totalIncompleteSuites === 0) && (totalFailedSuites === 0) && (totalIncompleteTests === 0) && (totalFailedTests === 0) && (totalErrors === 0);
      result = {
        totalSuites: totalSuites,
        totalPassedSuites: totalPassedSuites,
        totalFailedSuites: totalFailedSuites,
        totalIncompleteSuites: totalIncompleteSuites,
        totalTests: totalTests,
        totalPassedTests: totalPassedTests,
        totalFailedTests: totalFailedTests,
        totalIncompleteTests: totalIncompleteTests,
        totalErrors: totalErrors,
        success: success
      };
      return result;
    },
    getErrorLogs: function() {
      return joePrivate.errorLogs.slice();
    },
    hasErrors: function() {
      return joe.getTotals().success === false;
    },
    hasExited: function() {
      return joePrivate.exited === true;
    },
    hasReporters: function() {
      return joePrivate.reporters !== 0;
    },
    addReporter: function(reporterInstance) {
      reporterInstance.joe = joe;
      joePrivate.reporters.push(reporterInstance);
      return joe;
    },
    setReporter: function(reporterInstance) {
      joePrivate.reporters = [];
      if (reporterInstance != null) {
        joe.addReporter(reporterInstance);
      }
      return joe;
    },
    report: function() {
      var args, event, reporter, reporters, _i, _len, _ref;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      reporters = joePrivate.getReporters();
      if (!reporters.length) {
        console.log("Joe has no reporters loaded, so cannot log anything...");
        joe.exit(1);
        return joe;
      }
      for (_i = 0, _len = reporters.length; _i < _len; _i++) {
        reporter = reporters[_i];
        if ((_ref = reporter[event]) != null) {
          _ref.apply(reporter, args);
        }
      }
      return joe;
    },
    exit: function(exitCode) {
      if (joe.exited) {
        return;
      }
      joePrivate.exited = true;
      if (exitCode == null) {
        exitCode = joe.hasErrors() ? 1 : 0;
      }
      joe.report('exit', exitCode);
      if (typeof process !== "undefined" && process !== null) {
        process.exit(exitCode);
      }
      return joe;
    },
    uncaughtException: function(err) {
      if (joe.hasExited()) {
        return;
      }
      if (!(err instanceof Error)) {
        err = new Error(err);
      }
      joePrivate.addErrorLog({
        testName: 'uncaughtException',
        err: err
      });
      joe.report('uncaughtException', err);
      joe.exit(1);
      return joe;
    },
    getSuiteName: function(suite, separator) {
      var parentSuite, parentSuiteName, result, suiteName;
      suiteName = suite.getSuiteName();
      result = suiteName;
      if (separator) {
        parentSuite = suite.getParentSuite();
        if (parentSuite) {
          parentSuiteName = joe.getSuiteName(parentSuite, separator);
          result = '';
          if (parentSuiteName) {
            result += "" + parentSuiteName + separator;
          }
          result += "" + suiteName;
        }
      }
      return result;
    },
    getTestName: function(suite, testName, separator) {
      var result, suiteName;
      result = testName;
      if (separator && (suite != null)) {
        suiteName = joe.getSuiteName(suite, separator);
        result = '';
        result += "" + suiteName;
        if (testName) {
          result += "" + separator + testName;
        }
      }
      return result;
    }
  };

  if (typeof process !== "undefined" && process !== null) {
    process.on('SIGINT', function() {
      if (!joe.hasExited()) {
        return joe.exit();
      }
    });
    process.on('exit', function() {
      joePrivate.getGlobalSuite().exit();
      if (!joe.hasExited()) {
        return joe.exit();
      }
    });
    process.on('uncaughtException', function(err) {
      if (!joe.hasExited()) {
        return joe.uncaughtException(err);
      }
    });
  }

  joe.describe = joe.suite = function(name, fn) {
    return joePrivate.getGlobalSuite().suite(name, fn);
  };

  joe.it = joe.test = function(name, fn) {
    return joePrivate.getGlobalSuite().test(name, fn);
  };

  if (typeof require !== "undefined" && require !== null) {
    joe.require = function(path) {
      return require(__dirname + '/' + path);
    };
  }

  if (typeof require !== "undefined" && require !== null) {
    if (typeof Object.freeze === "function") {
      Object.freeze(joe);
    }
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = joe;
  } else {
    this.joe = joe;
  }

}