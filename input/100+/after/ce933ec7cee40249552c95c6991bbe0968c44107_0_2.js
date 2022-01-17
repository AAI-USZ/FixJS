function schedule() {
    if (queue[0]) {
      // clear stack before running the next statement
      var next = queue.shift();
      process.nextTick(function() {
        run(next);
      });
    }
  }