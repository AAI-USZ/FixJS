function startTask() {
    var task = self.tasks.shift();
    if (task) {
      task.fn.call(task.context || self, startTask);
    } else {
      self.running -= 1;
      if (self.running === 0) runCallbacks();
    }
  }