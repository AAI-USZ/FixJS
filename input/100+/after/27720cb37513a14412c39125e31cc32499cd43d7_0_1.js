function(post_data) {
        var url = this.$el.data('tasks-url');

        var post_data = this.collectPostData();

        if (typeof(window.history.pushState) == 'function'){
            history.pushState({}, "issues ", "?"+$.param(post_data));
        }

        $.get(url, post_data, function(data) {
            Greenmine.tagCollection.reset(data.filter_dict.tags);
            Greenmine.milestoneCollection.reset(data.filter_dict.milestones);
            Greenmine.statusCollection.reset(data.filter_dict.status);
            Greenmine.assignedToCollection.reset(data.filter_dict.assigned_to);
            Greenmine.taskCollection.reset(data.tasks);
        }, 'json');
    }