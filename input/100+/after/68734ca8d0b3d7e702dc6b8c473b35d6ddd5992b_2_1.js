function(suite, testName, err) {
      var check, message;
      testName = this.getTestName(suite, testName);
      if (!testName) {
        return this;
      }
      check = (err ? this.config.fail : this.config.pass);
      message = "" + check + testName;
      console.log(message, (typeof process !== "undefined" && process !== null) === false && err ? [err, err.stack] : '');
      return this;
    }