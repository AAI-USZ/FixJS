function(topic) {
        var self    = this;
            view    = new app.view.TopicView({model: topic});

        self.$topics.append( view.$el );

        return view;
    }