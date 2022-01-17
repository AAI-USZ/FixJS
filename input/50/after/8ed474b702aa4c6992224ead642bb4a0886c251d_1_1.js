function worker(task, callback) {
    if (dead) return;
    fn(task, callback);
  }