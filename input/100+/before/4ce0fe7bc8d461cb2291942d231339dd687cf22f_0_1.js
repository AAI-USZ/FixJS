function() {
        var breadcrump, path;
        $(this.el).html(require('./templates/todolist'));
        this.$(".todo-list-title span.description").html(this.model.title);
        path = this.model.humanPath.split(",").join(" / ");
        this.$(".todo-list-title span.breadcrump").html(path);
        this.taskList = new TaskList(this, this.$("#task-list"));
        this.archiveList = new TaskList(this, this.$("#archive-list"));
        this.tasks = this.taskList.tasks;
        this.archiveTasks = this.archiveList.tasks;
        this.newButton = $("#new-task-button");
        this.showButtonsButton = $("#edit-button");
        this.newButton.hide();
        breadcrump = this.model.humanPath.split(",");
        breadcrump.pop();
        $("#todo-list-full-breadcrump").html(breadcrump.join(" / "));
        $("#todo-list-full-title").html(this.model.title);
        return this.el;
      }