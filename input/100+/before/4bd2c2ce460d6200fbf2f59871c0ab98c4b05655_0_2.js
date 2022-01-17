function(err) {
      var errors, lastResult, results;
      if (err == null) {
        err = null;
      }
      if (this.hasExited()) {

      } else {
        lastResult = this.lastResult;
        errors = this.errors.length !== 0 ? this.errors : null;
        if (this.errors.length === 1) {
          errors = errors[0];
        }
        results = this.results;
        if (this.autoClear) {
          this.clear();
        } else {
          this.hasExited(true);
        }
        this.next(errors, lastResult, results);
      }
      return this;
    }