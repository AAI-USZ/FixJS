function() {
      var args, err;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      err = args[0] || void 0;
      this.lastResult = args;
      if (err) {
        this.errors.push(err);
      }
      this.results.push(args);
      if (this.running !== 0) {
        --this.running;
      }
      if (this.hasExited()) {

      } else {
        if (err && this.breakOnError) {
          this.exit();
        } else {
          ++this.completed;
          if (this.hasTasks()) {
            this.nextTask();
          } else if (this.isRunning() === false && this.hasCompleted()) {
            this.exit();
          }
        }
      }
      return this;
    }