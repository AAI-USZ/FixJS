function(task) {
        var view = new Greenmine.TaskView({model:task});
        this.$("#task-list-body").append(view.render().el);
    }