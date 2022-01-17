function(post_data) {
        var url = this.$el.data('tasks-url');
        var post_data = this.collectPostData();

        $.post(url, post_data, function(data) {
            console.log(data);

            Greenmine.tagCollection.reset(data.tags);
            Greenmine.taskCollection.reset(data.tasks);
        }, 'json');
    }