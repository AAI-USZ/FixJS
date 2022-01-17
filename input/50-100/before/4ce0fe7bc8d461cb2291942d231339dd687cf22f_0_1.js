function(task) {
        var nextTask;
        task.collection = this;
        nextTask = this.at(0);
        if (nextTask != null) {
          nextTask.setPreviousTask(task);
          task.setNextTask(nextTask);
        }
        return this.view.addTaskLineAsFirstRow(task);
      }