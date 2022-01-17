function(task) {
      ++this.total;
      this.queue.push(task);
      return this;
    }