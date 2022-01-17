function startTask() {
    var task = self.tasks.shift();
    if (task) {
      try {
        task.fn.call(task.context || self, startTask);
      } catch (e) {
        startTask();
        // TODO: log this
      }
    } else {
      self.running -= 1;
      if (self.running === 0) runCallbacks();
    }
  }