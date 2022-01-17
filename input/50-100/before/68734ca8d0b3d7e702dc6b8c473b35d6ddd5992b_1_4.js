function(suite, testName) {
      var message;
      ++this.total;
      testName = this.getTestName(suite, testName);
      message = "" + testName + this.config.start;
      console.log(message);
      return this;
    }