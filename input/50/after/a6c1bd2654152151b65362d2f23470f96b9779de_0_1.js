function(task) {
        console.log(task);
        var view = new Greenmine.TaskView({model:task});
        this.$(".list-body").append(view.render().el);
    }