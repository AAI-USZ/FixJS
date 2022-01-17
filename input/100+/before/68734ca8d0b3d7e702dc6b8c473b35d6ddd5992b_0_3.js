function() {
  var Block, balUtilFlow, config, joe, joePrivate,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  balUtilFlow = (typeof require === "function" ? require('bal-util') : void 0) || this.balUtilFlow;

  Block = balUtilFlow.Block;

  config = {
    troubleshootingURL: 'https://github.com/bevry/joe/wiki/Troubleshooting'
  };

  joePrivate = {
    globalSuite: null,
    getGlobalSuite: function() {
      if (joePrivate.globalSuite == null) {
        joePrivate.globalSuite = new joe.Suite('joe');
      }
      return joePrivate.globalSuite;
    },
    errord: false,
    exited: false,
    reporters: [],
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
    hasErrors: function() {
      return joePrivate.errord === true;
    },
    hasExited: function() {
      return joePrivate.exited === true;
    },
    hasReporters: function() {
      return joePrivate.reporters !== 0;
    },
    addReporter: function(reporterInstance) {
      joePrivate.reporters.push(reporterInstance);
      return this;
    },
    setReporter: function(reporterInstance) {
      joePrivate.reporters = [];
      if (reporterInstance != null) {
        joe.addReporter(reporterInstance);
      }
      return this;
    },
    report: function() {
      var args, event, reporter, reporters, _i, _len, _ref;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      reporters = joePrivate.getReporters();
      if (!reporters.length) {
        console.log("Joe has no reporters loaded, so cannot log anything...");
        joe.exit(1);
        return this;
      }
      for (_i = 0, _len = reporters.length; _i < _len; _i++) {
        reporter = reporters[_i];
        if ((_ref = reporter[event]) != null) {
          _ref.apply(reporter, args);
        }
      }
      return this;
    },
    exit: function(exitCode) {
      if (joe.exited) {
        return;
      }
      joePrivate.exited = true;
      joe.report('exit');
      if (typeof process !== "undefined" && process !== null) {
        if (exitCode == null) {
          exitCode = joe.hasErrors() ? 1 : 0;
        }
        process.exit(exitCode);
      }
      return this;
    },
    uncaughtException: function(err) {
      if (joe.hasExited()) {
        return;
      }
      joePrivate.errord = true;
      if (!(err instanceof Error)) {
        err = new Error(err);
      }
      joe.report('uncaughtException', err);
      joe.exit(1);
      return this;
    },
    Suite: (function(_super) {

      __extends(_Class, _super);

      function _Class() {
        return _Class.__super__.constructor.apply(this, arguments);
      }

      _Class.prototype.createSubBlock = function(name, fn, parentBlock) {
        return new joe.Suite(name, fn, parentBlock);
      };

      _Class.prototype.blockBefore = function(block) {
        joe.report('startSuite', block);
        return _Class.__super__.blockBefore.apply(this, arguments);
      };

      _Class.prototype.blockAfter = function(block, err) {
        if (err) {
          joePrivate.errord = true;
        }
        joe.report('finishSuite', block, err);
        return _Class.__super__.blockAfter.apply(this, arguments);
      };

      _Class.prototype.blockTaskBefore = function(block, test) {
        joe.report('startTest', block, test);
        return _Class.__super__.blockTaskBefore.apply(this, arguments);
      };

      _Class.prototype.blockTaskAfter = function(block, test, err) {
        if (err) {
          joePrivate.errord = true;
        }
        joe.report('finishTest', block, test, err);
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

    })(Block)
  };

  if (typeof process !== "undefined" && process !== null) {
    process.on('SIGINT', function() {
      if (!joe.hasExited()) {
        return joe.exit();
      }
    });
    process.on('exit', function() {
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