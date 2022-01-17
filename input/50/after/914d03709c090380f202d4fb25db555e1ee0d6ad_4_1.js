function(topic) {
            var view    = new app.View.TopicView({model: topic});

            self.$topics.append( view.$el );
        }