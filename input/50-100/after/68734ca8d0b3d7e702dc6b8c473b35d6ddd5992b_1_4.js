function(suite, testName) {
      var message;
      testName = this.getTestName(suite, testName);
      if (!testName) {
        return this;
      }
      message = "" + testName + this.config.start;
      console.log(message);
      return this;
    }