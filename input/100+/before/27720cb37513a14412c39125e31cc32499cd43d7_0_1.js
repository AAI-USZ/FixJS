function(post_data) {
        var url = this.$el.data('tasks-url');

        var params = "?order_by=" + this._order_mod + this._order;
        params += "&milestone=" + this._milestone_id;
        params += "&tags=" + this.options.tag_filter;
        if (typeof(window.history.pushState) == 'function'){
            history.pushState({}, "issues ", params);
        }

        var post_data = this.collectPostData();

        $.get(url, post_data, function(data) {
            Greenmine.tagCollection.reset(data.tags);
            Greenmine.taskCollection.reset(data.tasks);
        }, 'json');
    }