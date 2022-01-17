function(suite, testName, err) {
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
      message = "" + check + testName;
      return console.log(message, (typeof process !== "undefined" && process !== null) === false && err ? [err, err.stack] : '');
    }