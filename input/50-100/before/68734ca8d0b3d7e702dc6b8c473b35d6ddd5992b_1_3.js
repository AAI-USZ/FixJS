function(suite, err) {
      var check, message, suiteName;
      if (err && this.errors.length === 0) {
        this.uncaughtException(err);
      }
      suiteName = this.getSuiteName(suite);
      check = (err ? this.config.fail : this.config.pass);
      message = "" + suiteName + check;
      console.log(message);
      return this;
    }