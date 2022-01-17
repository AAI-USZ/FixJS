function(suite) {
      var message, suiteName;
      suiteName = this.getSuiteName(suite);
      if (!suiteName) {
        return this;
      }
      message = "" + suiteName + this.config.start;
      console.log(message);
      return this;
    }