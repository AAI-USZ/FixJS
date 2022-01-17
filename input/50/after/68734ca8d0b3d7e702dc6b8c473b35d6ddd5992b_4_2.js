function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      ++this.total;
      this.queue.push(args);
      return this;
    }