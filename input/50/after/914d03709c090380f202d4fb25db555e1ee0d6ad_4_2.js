function(topic) {
        var self    = this;
            view    = new app.View.TopicView({model: topic});

        self.$topics.append( view.$el );

        return view;
    }