function(suite) {
      var message, suiteName;
      suiteName = this.getSuiteName(suite);
      message = "" + suiteName + this.config.start;
      console.log(message);
      return this;
    }