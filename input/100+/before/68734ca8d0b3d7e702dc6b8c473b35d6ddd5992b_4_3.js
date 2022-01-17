function(err) {
      var errors, lastResult, results;
      if (err == null) {
        err = null;
      }
      if (this.hasExited()) {

      } else {
        lastResult = this.lastResult;
        errors = this.errors.length !== 0 ? this.errors : null;
        results = this.results;
        if (this.autoClear) {
          this.clear();
        } else {
          this.hasExited(true);
        }
        if (typeof this.next === "function") {
          this.next(errors, lastResult, results);
        }
      }
      return this;
    }