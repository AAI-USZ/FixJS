function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this.mode === 'sync' && this.isRunning()) {
        this.push.apply(this, args);
      } else {
        ++this.total;
        this.runTask(args);
      }
      return this;
    }