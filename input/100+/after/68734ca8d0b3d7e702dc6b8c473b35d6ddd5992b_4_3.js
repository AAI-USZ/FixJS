function(err) {
      var errors, lastResult, results;
      if (err == null) {
        err = null;
      }
      if (err) {
        this.logError(err);
      }
      if (this.hasExited()) {

      } else {
        lastResult = this.lastResult;
        results = this.results;
        if (this.errors.length === 0) {
          errors = null;
        } else if (this.errors.length === 1) {
          errors = this.errors[0];
        } else {
          errors = this.errors;
        }
        if (this.autoClear) {
          this.clear();
        } else {
          this.hasExited(true);
        }
        this.next(errors, lastResult, results);
      }
      return this;
    }