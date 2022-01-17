function(suite, err) {
      var check, message, suiteName;
      suiteName = this.getSuiteName(suite);
      if (!suiteName) {
        return this;
      }
      check = (err ? this.config.fail : this.config.pass);
      message = "" + suiteName + check;
      console.log(message);
      return this;
    }