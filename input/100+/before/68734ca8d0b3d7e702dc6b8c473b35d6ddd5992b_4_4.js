function(task) {
      try {
        ++this.running;
        task(this.completer());
      } catch (err) {
        this.complete(err);
      }
      return this;
    }