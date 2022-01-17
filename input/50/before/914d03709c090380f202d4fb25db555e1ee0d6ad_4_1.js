function(topic) {
            var view    = new app.view.TopicView({model: topic});

            self.$topics.append( view.$el );
        }