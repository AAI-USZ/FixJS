function(id) {
        var task;
        task = this.tasks.get(id);
        if (task == null) {
          this.showTasks();
          return this.showError('That task doesn\'t exist.');
        } else {
          this.router.navigate("task/" + task.id);
          return this.body.show(this.taskView = new TaskView({
            model: task
          }));
        }
      }