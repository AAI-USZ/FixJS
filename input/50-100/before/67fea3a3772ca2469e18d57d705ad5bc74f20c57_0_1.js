function () {
      taskList.forEach(taskWidgetFactory);
      taskListWidget.onNewTaskRequest(function (description) {
        var task, taskWidget;
        task = taskList.newTask(description, function () {
          taskWidget.working(false);
        });
        taskWidget = taskWidgetFactory(task, taskListWidget);
        taskWidget.working(true);
      });
      taskListWidget.attachToDOM();
    }