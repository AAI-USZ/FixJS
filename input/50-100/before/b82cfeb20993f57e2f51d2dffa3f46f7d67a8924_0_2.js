function(post_data) {
        var url = this.$el.data('tasks-url');

        if (post_data === undefined) {
            post_data = {};
        }

        var postdata = _.extend({}, this.collectPostData(), post_data);

        $.post(url, postdata, function(data) {
            Greenmine.taskCollection.reset(data.tasks);
        }, 'json');
    }