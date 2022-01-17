function(task) {
      if (this.mode === 'sync' && this.isRunning()) {
        this.push(task);
      } else {
        ++this.total;
        this.runTask(task);
      }
      return this;
    }