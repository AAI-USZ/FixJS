function(task) {
        this.router.navigate("task/" + task.id);
        if (!_.isObject(task)) {
          task = this.tasks.get(task);
        }
        return this.body.show(this.taskView = new TaskView({
          model: task
        }));
      }