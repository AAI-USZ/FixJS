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
        _base6.summaryFail = "FAILURE: %s/%s tests ran successfully; %s failed, %s incomplete, %s errors";
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